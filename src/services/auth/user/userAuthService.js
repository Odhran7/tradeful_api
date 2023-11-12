// This is the auth service for the user
import admin from 'firebase-admin';
import { validateUser } from '../../../utils/validators';
import UserModel from '../../../models/profiles/userModel';
import registerTradesperson from '../tradesperson/tradespersonAuthService';
import registerHomeowner from '../homeowner/homeownerAuthService';
import logger from '../../../config/logger';
// Registers a new user as a homeowner
const registerUserHomeOwner = async (data) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      password,
      role,
      propertyDetails,
    } = data;
    const validation = validateUser({
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      role,
    });

    if (!validation.isValid) {
      logger.error(`Validation failed: ${validation.errors.join(', ')}`);
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const userId = userRecord.uid;
    await UserModel.createUser({
      uid: userId,
      firstName,
      lastName,
      phoneNumber,
      address,
      role,
    });
    await registerHomeowner(userId, { propertyDetails });

    return { userId };
  } catch (error) {
    logger.error('Error registering user: ' + error.message);
    throw error;
  }
};

// Registers a new user as a tradesperson
const registerUserTradesperson = async (data) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      password,
      role,
      tradeType,
      businessName,
      skills,
      qualifications,
    } = data;
    const validation = validateUser({
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      role,
      tradeType,
      businessName,
      skills,
      qualifications,
    });
    if (!validation.isValid) {
      logger.error(`Validation failed: ${validation.errors.join(', ')}`);
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const userId = userRecord.uid;
    await UserModel.createUser({
      uid: userId,
      firstName,
      lastName,
      phoneNumber,
      address,
      role,
    });

    await registerTradesperson(userId, {
      tradeType,
      businessName,
      skills,
      qualifications,
    });

    return { userId };
  } catch (error) {
    logger.error('Error registering user: ' + error.message);
    throw error;
  }
};

// Logs in a user
const loginUser = async (email, password) => {
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const token = await userCredential.user.getIdToken();
    return { token };
  } catch (error) {
    logger.error('Error logging in user: ' + error.message);
    throw error;
  }
};

export { loginUser, registerUserHomeOwner, registerUserTradesperson };
