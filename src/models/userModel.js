// This is the user model (firebase)
/*
firstName,
lastName,
phoneNumber,
address,
email,
password,
role
*/

import { db } from './firebaseConfig';

const userCollection = db.collection('users');

const UserModel = {
  createUser: async (userData) => {
    const docRef = await userCollection.add(userData);
    return docRef.id;
  },
  getUserById: async (id) => {
    const doc = await userCollection.doc(id).get();
    return doc.exists ? doc.data() : null;
  },
  updateUserById: async (id, userData) => {
    await userCollection.doc(id).update(userData);
  },
  deleteUserById: async (id) => {
    await userCollection.doc(id).delete();
  },
};

export default UserModel;
