import { User } from '../models/User.model';
import db from '../config/firebase';

export const UserQuery = {
  getUsers: async () => {
      const snapshot = await db.collection('users').get();
      return snapshot.docs.map(doc => doc.data());
  },
  
  findUserByEmail: async (email: string) => {
      const snapshot = await db.collection('users').where('email', '==', email).get();
      return snapshot.docs.map(doc => doc.data());
  },

  createUser: async (data: User) => {
      const docRef = await db.collection('users').add(data);
      return docRef.id;
  }
};
