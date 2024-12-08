import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
const serviceAccount = require('../../jejak-sejarah-442803-serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();
const firebaseAdmin = admin;
const auth = getAuth();

export { db, firebaseAdmin, auth };