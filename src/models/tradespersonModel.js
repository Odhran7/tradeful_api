// This is the tradesperson model (firebase)
/*
userId,
tradeType,
businessName,
skills,
qualifications,
*/
import { db } from './firebaseConfig';

const tradespersonCollection = db.collection('tradespersons');

const TradespersonModel = {
  createTradesperson: async (tradespersonData) => {
    const docRef = await tradespersonCollection.add(tradespersonData);
    return docRef.id;
  },
  getTradespersonByUserId: async (userId) => {
    const snapshot = await tradespersonCollection.where('user', '==', userId).get();
    return snapshot.empty ? null : snapshot.docs[0].data();
  },
  updateTradespersonById: async (id, tradespersonData) => {
    await tradespersonCollection.doc(id).update(tradespersonData);
  },
};

export default TradespersonModel;
