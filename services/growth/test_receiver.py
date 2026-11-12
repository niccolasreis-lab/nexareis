import concurrent.futures
import json
import tempfile
import unittest
from pathlib import Path
from receiver import Inbox, Rejected

class InboxTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory()
        self.inbox=Inbox(str(Path(self.temp.name)/'db.sqlite3'),'https://example.invalid','a'*64,'m'*64)
        self.payload=dict(nome='Teste NexaReis',empresa='Auditoria',email='teste@example.com',whatsapp='11999999999',segmento='varejo',necessidade='chamaai-filas',mensagem='Teste sintético, sem atendimento necessário.')
    def tearDown(self): self.temp.cleanup()
    def test_concurrent_keys_and_retry_return_one_durable_receipt(self):
        with concurrent.futures.ThreadPoolExecutor(max_workers=20) as pool:
            results=list(pool.map(lambda i:self.inbox.contact(self.payload,'key-for-test-0000'+str(i),'test'),range(20)))
        self.assertEqual(len(set(r['receipt'] for r in results)),1)
        with self.inbox.db() as db:
            self.assertEqual(db.execute('SELECT count(*) FROM leads').fetchone()[0],1)
            self.assertEqual(db.execute('SELECT SUM(count) FROM limits').fetchone()[0],1)
        self.assertEqual(self.inbox.contact(self.payload,'key-for-test-00000','test'),results[0])
    def test_rate_limit_counts_only_new_leads_and_still_allows_a_safe_retry(self):
        first=self.inbox.contact(self.payload,'key-for-test-0000','test')
        for i in range(1,5):self.inbox.contact({**self.payload,'mensagem':'Pedido diferente '+str(i)},'key-for-test-0000'+str(i),'test')
        with self.assertRaises(Rejected) as error:self.inbox.contact({**self.payload,'mensagem':'Sexto pedido'},'key-for-test-00006','test')
        self.assertEqual(error.exception.status,429)
        self.assertEqual(self.inbox.contact(self.payload,'key-for-test-0000','test'),first)
    def test_same_key_different_contact_conflicts(self):
        self.inbox.contact(self.payload,'key-for-test-0000','test')
        with self.assertRaises(Rejected) as error:self.inbox.contact({**self.payload,'mensagem':'Outra solicitação'},'key-for-test-0000','test')
        self.assertEqual(error.exception.status,409)
    def test_validation_cannot_store_an_incomplete_lead(self):
        with self.assertRaises(Rejected):self.inbox.contact({**self.payload,'email':'bad'},'key-for-test-0000','test')
        with self.inbox.db() as db:self.assertEqual(db.execute('SELECT count(*) FROM leads').fetchone()[0],0)
    def test_ambiguous_timeout_does_not_replay_and_survives_restart(self):
        self.inbox.contact(self.payload,'key-for-test-0000','test')
        calls=[]
        def timeout(*args,**kwargs): calls.append(1); raise TimeoutError()
        self.assertTrue(self.inbox.deliver_one(timeout));self.assertFalse(self.inbox.deliver_one(timeout));self.assertEqual(len(calls),1)
        restored=Inbox(self.inbox.path,self.inbox.upstream,self.inbox.token,self.inbox.metrics_key)
        with restored.db() as db:self.assertEqual(db.execute('SELECT state FROM leads').fetchone()[0],'uncertain')
    def test_crash_during_delivery_is_retained_for_review(self):
        self.inbox.contact(self.payload,'key-for-test-0000','test')
        with self.inbox.db() as db: db.execute("UPDATE leads SET state='sending'")
        restored=Inbox(self.inbox.path,self.inbox.upstream,self.inbox.token,self.inbox.metrics_key)
        self.assertFalse(restored.deliver_one())
    def test_strict_upstream_ack_and_no_payload_recipient_override(self):
        self.inbox.contact({**self.payload,'number':'evil','origem':'https://evil.invalid'},'key-for-test-0000','test')
        class Reply:
            status=200
            def __enter__(self): return self
            def __exit__(self,*args): pass
            def read(self,*args): return b'{"ok":true}'
        def accepted(req,**kwargs):
            body=json.loads(req.data); self.assertNotIn('number',body);self.assertEqual(body['origem'],'https://www.nexareis.com.br/');return Reply()
        self.inbox.deliver_one(accepted)
        with self.inbox.db() as db:self.assertEqual(db.execute('SELECT state FROM leads').fetchone()[0],'accepted')
    def test_aggregate_metrics_reject_pii_and_unknown_routes(self):
        for bad in [dict(event='page_view',path='/',email='teste@example.com'),dict(event='page_view',path='/?email=x'),dict(event='CLS',path='/',value=float('nan'))]:
            with self.assertRaises(Rejected):self.inbox.metric(bad,'test','preview')
        self.inbox.metric(dict(event='LCP',path='/',value=1234),'test','preview')
        self.inbox.metric(dict(event='LCP',path='/',value=3000),'test','preview')
        report=self.inbox.report('m'*64,'test')
        self.assertEqual(report['totals'][0]['samples'],2);self.assertEqual(report['totals'][0]['good'],1)
        self.assertNotIn('client',str(report));self.assertNotIn('email',str(report))
    def test_report_denies_wrong_access_key(self):
        with self.assertRaises(Rejected) as e:self.inbox.report('wrong','test')
        self.assertEqual(e.exception.status,401)
if __name__=='__main__':unittest.main()
