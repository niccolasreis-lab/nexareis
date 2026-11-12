"""Owner-only operations inside the receiver container; never exposed as a web route."""
import argparse
import json
import sqlite3
from pathlib import Path
parser=argparse.ArgumentParser()
parser.add_argument('action',choices=['summary','pending','backup'])
parser.add_argument('--db',default='/data/growth.sqlite3')
parser.add_argument('--output',default='/data/backups/growth.sqlite3')
args=parser.parse_args()
with sqlite3.connect(args.db) as db:
    db.row_factory=sqlite3.Row
    if args.action=='summary':
        print(json.dumps([dict(r) for r in db.execute('SELECT state,COUNT(*) count FROM leads GROUP BY state')]))
    elif args.action=='pending':
        # Deliberate, owner-only access to recover contacts when a notification was not confirmed.
        print(json.dumps([dict(r) for r in db.execute("SELECT id,created,state,payload FROM leads WHERE state IN ('uncertain','rejected') ORDER BY created")],ensure_ascii=False))
    else:
        path=Path(args.output);path.parent.mkdir(parents=True,exist_ok=True)
        with sqlite3.connect(path) as target:db.backup(target)
        path.chmod(0o600)
        print(json.dumps({'backupCreated':True,'path':str(path)}))
