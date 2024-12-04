import { db } from '../config/firebase'; 
import { firebaseAdmin } from '../config/firebase';

export const AuthQuery = {
  getUserByUid: async (uid: string) => {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      throw new Error('User not found');
    }
    return userDoc.data();  
  },

  createCustomToken: async (uid: string) => {
    const token = await firebaseAdmin.auth().createCustomToken(uid);
    return token;  
  },

  createUser: async (data: { email: string, name: string, password: string }) => {
      const userRecord = await firebaseAdmin.auth().createUser({
        email: data.email,
        password: data.password,
        displayName: data.name,
    
      });

      await db.collection('users').doc(userRecord.uid).set({
        email: userRecord.email,
        name: userRecord.displayName,
        createdAt: new Date(),
      });

      return userRecord;  
  },
};
