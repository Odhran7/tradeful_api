// This is the homeowner model (firebase)
/*
userId
propertyDetails : [
    type,
    size,
    location,
    isBusiness
]
*/
import { db } from './firebaseConfig';

const homeownerCollection = db.collection('homeowners');

const HomeownerModel = {
  createHomeowner: async (homeownerData) => {
    const docRef = await homeownerCollection.add(homeownerData);
    return docRef.id;
  },
  getHomeownerByUserId: async (userId) => {
    const snapshot = await homeownerCollection.where('user', '==', userId).get();
    return snapshot.empty ? null : snapshot.docs[0].data();
  },
  updateHomeownerById: async (id, homeownerData) => {
    await homeownerCollection.doc(id).update(homeownerData);
  }
};

export default HomeownerModel;
