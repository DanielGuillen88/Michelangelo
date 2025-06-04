import admin from 'firebase-admin';
import { readFile } from 'fs/promises';

const jsonText = await readFile(new URL('./firebase.json', import.meta.url), 'utf-8');
const serviceAccount = JSON.parse(jsonText);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export { admin, db };
