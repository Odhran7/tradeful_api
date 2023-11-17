import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import dotenv from './envConfig.js';

function loadFirebaseConfig() {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
  if (!serviceAccountPath) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY_PATH is not set');
  }

  // Synchronously reading the service account JSON file
  let serviceAccount;
  try {
    const serviceAccountFile = readFileSync(serviceAccountPath, 'utf8');
    serviceAccount = JSON.parse(serviceAccountFile);
  } catch (error) {
    throw new Error('Failed to load Firebase service account file: ' + error.message);
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

loadFirebaseConfig();

const messaging = admin.messaging();

export { messaging };
