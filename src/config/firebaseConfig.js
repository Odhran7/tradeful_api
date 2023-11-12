// import admin from 'firebase-admin';
// import { readFileSync } from 'fs';
// import dotenv from 'dotenv';

// dotenv.config();

// async function loadFirebaseConfig() {
//   const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
//   if (!serviceAccountPath) {
//     throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY_PATH is not set');
//   }
//   const serviceAccount = import(serviceAccountPath);
//   admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
//   });
// }

// loadFirebaseConfig().catch(console.error);

// // Reading firebase key

// // const serviceAccount = JSON.parse(readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH, 'utf8'));

// const db = admin.firestore();
// const auth = admin.auth();

// export { db, auth };
