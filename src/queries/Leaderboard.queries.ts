import { db } from '../config/firebase'; // Pastikan Anda mengimpor db dengan benar
import { firebaseAdmin } from '../config/firebase';

export const LeaderboardQuery = {
    getPositionById: async (uid: string) => {
        try {
            const userDoc = await db.collection('users').doc(uid).get();
            if (!userDoc.exists) {
                throw new Error('User not found');
            }

            const snapshot = await db.collection('users').orderBy('points', 'desc').get();
            const users = snapshot.docs.map(doc => ({
                id: doc.id,
                points: doc.data().points,
            }));

            const position = users.findIndex(user => user.id === uid) + 1;
            return position;
        } catch (error) {
            console.error('Error getting user position:', error);
            throw new Error('Failed to get user position');
        }
    },
};
