import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('./firebase-config.json')
firebase_admin.initialize_app(cred)

def file_to_clean(file):
    data = pd.read_csv(file,skip_blank_lines=True)
    data.drop_duplicates(subset=None, keep='first', inplace=False, ignore_index=False)
    data.to_csv(file, header=True)
    db = firestore.client()
    db.collection('valorant').document('value').set(data)
    print('Donnée ajoutée avec succès')
    

db = firestore.client()
doc_ref = db.collection('valorant').document('value')
doc = doc_ref.get()
if doc.exists:
    file_to_clean(doc)
else:
    print("Aucun document!")
