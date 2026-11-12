"""Isolated durable lead inbox and anonymous aggregate counters. No third-party packages."""
import contextlib
import hashlib
import hmac
import json
import os
import re
import secrets
import sqlite3
import threading
import time
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PRODUCTS = {'chamaai-food', 'chamaai-filas', 'signageflow', 'cesta-esperta', 'sob-medida'}
CONTACT_NEEDS = PRODUCTS | {'outros'}
SEGMENTS = {'supermercados', 'restaurantes', 'clinicas', 'varejo', 'outros'}
EVENTS = {'page_view', 'project_view', 'demo_click', 'whatsapp_click', 'quote_complete', 'contact_registered'}
PATHS = {'/', '/nicolas-reis', '/curriculo', '/orcamento', *('/projetos/' + p for p in PRODUCTS if p != 'sob-medida'), *('/servicos/' + p for p in ['automacao', 'sistemas', 'integracao', 'nexa-solutions', 'nexa-data'])}

class Rejected(Exception):
    def __init__(self, status, code): self.status, self.code = status, code

class Inbox:
    def __init__(self, path, upstream, token, metrics_key):
        self.path, self.upstream, self.token, self.metrics_key = path, upstream, token, metrics_key
        self.wake = threading.Event()
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        with self.db() as db:
            db.executescript('''
            PRAGMA journal_mode=WAL;
            CREATE TABLE IF NOT EXISTS leads(
              id TEXT PRIMARY KEY, request_key TEXT UNIQUE NOT NULL, fingerprint TEXT NOT NULL,
              payload TEXT NOT NULL, created INTEGER NOT NULL, state TEXT NOT NULL DEFAULT 'queued', updated INTEGER NOT NULL);
            CREATE INDEX IF NOT EXISTS lead_fingerprint ON leads(fingerprint,created);
            CREATE TABLE IF NOT EXISTS totals(day TEXT, environment TEXT, event TEXT, product TEXT, path TEXT,
              count INTEGER NOT NULL, total REAL NOT NULL, good INTEGER NOT NULL,
              PRIMARY KEY(day,environment,event,product,path));
            CREATE TABLE IF NOT EXISTS limits(bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
            UPDATE leads SET state='uncertain' WHERE state='sending';
            ''')
        self.cleanup()

    @contextlib.contextmanager
    def db(self):
        db = sqlite3.connect(self.path, timeout=5, isolation_level=None)
        db.row_factory = sqlite3.Row
        try: yield db
        finally: db.close()

    def limit(self, bucket, maximum, seconds=60, connection=None):
        if connection is None:
            with self.db() as db: return self.limit(bucket, maximum, seconds, connection=db)
        now = int(time.time())
        key = bucket + ':' + str(now // seconds)
        connection.execute('INSERT INTO limits VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=count+1', (key, now + seconds))
        count = connection.execute('SELECT count FROM limits WHERE bucket=?', (key,)).fetchone()[0]
        if count > maximum: raise Rejected(429, 'rate_limited')

    def contact(self, raw, key, client):
        if not re.fullmatch(r'[A-Za-z0-9_-]{16,100}', key or ''): raise Rejected(400, 'invalid_request_key')
        fields = {'nome':120, 'empresa':120, 'email':254, 'whatsapp':30, 'segmento':30, 'necessidade':30, 'mensagem':4000}
        if not isinstance(raw, dict): raise Rejected(400, 'invalid_contact')
        payload = {}
        for name, maximum in fields.items():
            value = raw.get(name)
            if not isinstance(value, str) or not value.strip() or len(value) > maximum: raise Rejected(400, 'invalid_' + name)
            payload[name] = value.strip()
        if not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+', payload['email']): raise Rejected(400, 'invalid_email')
        if len(re.sub(r'\D', '', payload['whatsapp'])) not in (10,11): raise Rejected(400, 'invalid_whatsapp')
        if payload['segmento'] not in SEGMENTS or payload['necessidade'] not in CONTACT_NEEDS: raise Rejected(400, 'invalid_choice')
        canonical = json.dumps(payload, sort_keys=True, ensure_ascii=False)
        # HMAC prevents dictionary attacks on stored contact fingerprints.
        fingerprint = hmac.new(self.token.encode(), canonical.encode(), hashlib.sha256).hexdigest()
        now = int(time.time())
        with self.db() as db:
            db.execute('BEGIN IMMEDIATE')
            row = db.execute('SELECT * FROM leads WHERE request_key=?', (key,)).fetchone()
            if row and row['fingerprint'] != fingerprint:
                db.rollback(); raise Rejected(409, 'request_key_conflict')
            # A changed key from another tab/reload must not duplicate the same lead.
            if not row: row = db.execute('SELECT * FROM leads WHERE fingerprint=? AND created>? ORDER BY created DESC LIMIT 1', (fingerprint, now-600)).fetchone()
            if row:
                db.commit(); return {'ok':True, 'registered':True, 'receipt':row['id']}
            self.limit('contact:' + client, 5, 600, connection=db)
            receipt = 'NR-' + secrets.token_hex(8).upper()
            payload.update({'formulario':'Contato Comercial NexaReis','origem':'https://www.nexareis.com.br/', 'name':payload['nome'], 'businessName':payload['empresa'], 'phone':payload['whatsapp'], 'segment':payload['segmento'], 'currentPain':payload['mensagem']})
            db.execute('INSERT INTO leads(id,request_key,fingerprint,payload,created,updated) VALUES(?,?,?,?,?,?)', (receipt,key,fingerprint,json.dumps(payload,ensure_ascii=False),now,now))
            db.commit()
        self.wake.set()
        return {'ok':True,'registered':True,'receipt':receipt}

    def metric(self, raw, client, environment):
        if not isinstance(raw, dict): raise Rejected(400,'invalid_event')
        # Never persist arbitrary dimensions, URL queries, contact data or visitor identifiers.
        if set(raw) - {'event','product','path','value'}: raise Rejected(400,'invalid_dimensions')
        event, product, path = raw.get('event'), raw.get('product',''), raw.get('path')
        if path not in PATHS or product not in PRODUCTS | {''}: raise Rejected(400,'invalid_dimensions')
        value, good = 0, 0
        if event in {'LCP','INP','CLS'}:
            value = raw.get('value')
            maximum = 10 if event=='CLS' else 120000
            if isinstance(value,bool) or not isinstance(value,(float,int)) or not 0 <= value <= maximum: raise Rejected(400,'invalid_value')
            good = int(value <= {'LCP':2500,'INP':200,'CLS':0.1}[event])
        elif event not in EVENTS or 'value' in raw: raise Rejected(400,'invalid_event')
        self.limit('events:' + client, 120)
        environment = 'production' if environment=='production' else 'preview'
        day = time.strftime('%Y-%m-%d',time.gmtime())
        with self.db() as db:
            db.execute('''INSERT INTO totals VALUES(?,?,?,?,?,1,?,?) ON CONFLICT(day,environment,event,product,path)
              DO UPDATE SET count=count+1,total=total+excluded.total,good=good+excluded.good''', (day,environment,event,product,path,value,good))

    def report(self, key, client):
        self.limit('report:' + client, 10)
        if not self.metrics_key or not hmac.compare_digest(key or '',self.metrics_key): raise Rejected(401,'unauthorized')
        with self.db() as db:
            totals = [dict(r) for r in db.execute("SELECT environment,event,product,path,SUM(count) samples,SUM(total) total,SUM(good) good FROM totals WHERE day>=date('now','-29 days') GROUP BY environment,event,product,path ORDER BY samples DESC")]
            leads = [dict(r) for r in db.execute("SELECT state,COUNT(*) count FROM leads WHERE created>? GROUP BY state",(int(time.time())-30*86400,))]
        return {'ok':True,'days':30,'totals':totals,'notifications':leads}

    def deliver_one(self, opener=urllib.request.urlopen):
        with self.db() as db:
            db.execute('BEGIN IMMEDIATE')
            row = db.execute("SELECT * FROM leads WHERE state='queued' ORDER BY created LIMIT 1").fetchone()
            if not row: db.commit(); return False
            db.execute("UPDATE leads SET state='sending',updated=? WHERE id=?",(int(time.time()),row['id'])); db.commit()
        state = 'uncertain'
        try:
            req = urllib.request.Request(self.upstream, data=row['payload'].encode(),headers={'Content-Type':'application/json'},method='POST')
            with opener(req,timeout=12) as response:
                body = json.loads(response.read(65536))
                if 200 <= response.status < 300 and isinstance(body,dict) and body.get('ok') is True: state='accepted'
                else: state='rejected'
        except urllib.error.HTTPError: state='rejected'
        except Exception: pass # No replay after an ambiguous outcome; the durable lead stays available.
        with self.db() as db: db.execute('UPDATE leads SET state=?,updated=? WHERE id=?',(state,int(time.time()),row['id']))
        return True

    def cleanup(self):
        with self.db() as db:
            # Retain unresolved leads for review. Successful notifications retain contacts for 90 days.
            db.execute("DELETE FROM leads WHERE state='accepted' AND created<?",(int(time.time())-90*86400,))
            db.execute("DELETE FROM totals WHERE day<date('now','-90 days')")
            db.execute('DELETE FROM limits WHERE expires<?',(int(time.time()),))

    def worker(self):
        while True:
            try:
                while self.deliver_one(): pass
                self.cleanup()
            except Exception: print('growth: worker storage failure',flush=True)
            self.wake.wait(30); self.wake.clear()

class Handler(BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'
    def log_message(self,*args): pass # Never log URLs, contact contents, tokens or headers.
    def setup(self):
        super().setup(); self.connection.settimeout(12)
    def reply(self,status,body):
        data=json.dumps(body,separators=(',',':')).encode()
        self.send_response(status); self.send_header('Content-Type','application/json'); self.send_header('Content-Length',str(len(data))); self.send_header('Cache-Control','no-store'); self.send_header('X-Content-Type-Options','nosniff'); self.end_headers(); self.wfile.write(data)
    def do_GET(self):
        if self.path=='/health': return self.reply(200,{'ok':True})
        self.reply(405,{'ok':False})
    def do_POST(self):
        inbox=self.server.inbox
        try:
            if not hmac.compare_digest(self.headers.get('Authorization',''),'Bearer '+inbox.token): raise Rejected(401,'unauthorized')
            length=int(self.headers.get('Content-Length','0'))
            if not 0<length<=16384 or 'application/json' not in self.headers.get('Content-Type',''): raise Rejected(400,'invalid_body')
            raw=json.loads(self.rfile.read(length))
            client=self.headers.get('X-Client-Key','')
            if not re.fullmatch('[a-f0-9]{64}',client): raise Rejected(400,'invalid_client')
            if self.path=='/contact': result=inbox.contact(raw,self.headers.get('Idempotency-Key'),client)
            elif self.path=='/events': inbox.metric(raw,client,self.headers.get('X-Environment')); result={'ok':True}
            elif self.path=='/metrics': result=inbox.report(self.headers.get('X-Metrics-Key'),client)
            else: raise Rejected(404,'not_found')
            self.reply(200,result)
        except Rejected as e: self.reply(e.status,{'ok':False,'error':e.code})
        except (ValueError,TypeError): self.reply(400,{'ok':False,'error':'invalid_body'})
        except (BrokenPipeError,ConnectionResetError): pass
        except Exception: self.reply(503,{'ok':False,'error':'storage_unavailable'})

if __name__=='__main__':
    token=Path(os.environ['GROWTH_API_TOKEN_FILE']).read_text().strip() if os.environ.get('GROWTH_API_TOKEN_FILE') else os.environ.get('GROWTH_API_TOKEN','')
    if len(token)<32: raise SystemExit('GROWTH_API_TOKEN must be configured')
    metrics_key=Path(os.environ['METRICS_ACCESS_KEY_FILE']).read_text().strip() if os.environ.get('METRICS_ACCESS_KEY_FILE') else os.environ.get('METRICS_ACCESS_KEY','')
    inbox=Inbox(os.environ.get('GROWTH_DB','/data/growth.sqlite3'),os.environ['CONTACT_UPSTREAM_URL'],token,metrics_key)
    server=ThreadingHTTPServer(('0.0.0.0',8080),Handler); server.inbox=inbox
    threading.Thread(target=inbox.worker,daemon=True).start()
    server.serve_forever()
