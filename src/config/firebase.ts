import * as admin from 'firebase-admin';
const serviceAccount = require('../../jejak-sejarah-442803-14e9e131ee7d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();

export default db;