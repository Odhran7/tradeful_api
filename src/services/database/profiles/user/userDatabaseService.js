// This is the database schema related to the user model.
import { UserModel, HomeownerModel, TradespersonModel } from '../../../../models/index.js';
import { logger } from '../../../../config/index.js';
import hashPassword from '../../../../utils/auth/hash.js';
import { validateUser } from '../../../../utils/validators/index.js';
import { tradesmanDatabaseService, homeownerDatabaseService } from '../../../database/index.js';

// Create Homeowner User
const createHomeownerUser = async (data) => {
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
    // Check for preexisting user
    const isUser = await checkUserCanBeRegistered(
      email,
      phoneNumber,
      firstName,
      lastName
    );
    if (!isUser) {
      throw new Error('User already exists');
    }
    validateUser(
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      password,
      role
    );
    const hashedPassword = await hashPassword(password);
    const user = new UserModel({
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    const userId = user._id;

    const homeowner = await homeownerDatabaseService.createHomeowner(userId, propertyDetails);
    return { user, homeowner };

  } catch (error) {
    logger.error('Error creating homeowner user: ' + error.message);
    throw error;
  }
};

// Create Tradesperson User
const createTradespersonUser = async (data) => {
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
    // Check for preexisting user
    const isUser = await checkUserCanBeRegistered(
      email,
      phoneNumber,
      firstName,
      lastName
    );
    if (!isUser) {
      throw new Error('User already exists');
    }
    validateUser(
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      password,
      role
    );
    const hashedPassword = await hashPassword(password);
    const user = new UserModel({
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    const userId = user._id;
    const tradesman = await tradesmanDatabaseService.createTradesperson(
      userId.toString(),
      tradeType,
      businessName,
      skills,
      qualifications
    );
    return { user: user, tradesman: tradesman };
  } catch (error) {
    logger.error('Error creating homeowner user: ' + error.message);
    throw error;
  }
};

// Find a user by ID
const getUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (error) {
    logger.error('Error finding user by ID: ' + error.message);
    throw error;
  }
};

// Update a user by ID
const updateUserById = async (userId, data) => {
  try {
    const { firstName, lastName, phoneNumber, address, email, password, role } =
      data;
    validateUser(
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      password,
      role
    );
    const hashedPassword = await hashPassword(password);
    const user = await UserModel.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      password: hashedPassword,
      role,
    });
    return user;
  } catch (error) {
    logger.error('Error updating user by ID: ' + error.message);
    throw error;
  }
};

// Delete a user by ID
const deleteUserById = async (userId) => {
  try {
    const user = await getUserById(userId);
    if (user) {
      await HomeownerModel.deleteMany({ userId: userId });
      await TradespersonModel.deleteMany({ userId: userId });
      await UserModel.findByIdAndDelete(userId);
    }
    return user;
  } catch (error) {
    logger.error('Error deleting user by ID: ' + error.message);
    throw error;
  }
};

// Function retrieves a user by email
const getUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    logger.error('Error getting user by email: ' + error.message);
    throw error;
  }
};

// Function retrieves a user by phoneNumber
const getUserByPhoneNumber = async (phoneNumber) => {
  try {
    const user = await UserModel.findOne({ phoneNumber });
    return user;
  } catch (error) {
    logger.error('Error getting user by phoneNumber: ' + error.message);
    throw error;
  }
};

// This function checks for the presence of an existing email
const checkEmail = async (email) => {
  try {
    const users = await UserModel.find({ email });
    if (users.length > 0) {
      return true;
    }
  } catch (error) {
    logger.error('Error checking if user exists: ' + error.message);
    throw error;
  }
  return false;
};

// This function checks for the presence of an existing phone number
const checkPhoneNumber = async (phoneNumber) => {
  try {
    const users = await UserModel.find({ phoneNumber });
    if (users.length > 0) {
      return true;
    }
  } catch (error) {
    logger.error('Error checking if user exists: ' + error.message);
    throw error;
  }
  return false;
};

// This function checks for the presence of an existing first and last name
const checkFirstLastName = async (firstName, lastName) => {
  try {
    const users = await UserModel.find({ firstName, lastName });
    if (users.length > 0) {
      return true;
    }
  } catch (error) {
    logger.error('Error checking if user exists: ' + error.message);
    throw error;
  }
  return false;
};

// Check if a user can be registered
const checkUserCanBeRegistered = async (
  email,
  phoneNumber,
  firstName,
  lastName
) => {
  try {
    const isEmail = await checkEmail(email);
    const isPhoneNumber = await checkPhoneNumber(phoneNumber);
    const isFirstLastName = await checkFirstLastName(firstName, lastName);
    if (!isEmail && !isPhoneNumber && !isFirstLastName) {
      return true;
    }
  } catch (error) {
    logger.error('Error checking if user can be registered: ' + error.message);
    throw error;
  }
  return false;
};

// This function updates the fcm token for a user
const updateFcmToken = async (userId, fcmToken) => {
  try {
    const user = await getUserById(userId);
    if (user) {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, { fcmToken: fcmToken })
      return updatedUser;
    }
  } catch (error) {
    logger.error('Error updating fcm token: ' + error.message);
    throw error;
  }
}

// Gets the FCM token for a user 
const getFcmToken = async (userId) => {
  try {
    const user = await getUserById(userId);
    if (user) {
      const fcmToken = user.fcmToken;
      return fcmToken;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    logger.error('Error getting fcm token: ' + error.message);
    throw error;
  }
}

const userDatabaseService = {
  createHomeownerUser,
  createTradespersonUser,
  deleteUserById,
  getUserById,
  updateUserById,
  getUserByEmail,
  getUserByPhoneNumber,
  checkEmail,
  checkPhoneNumber,
  checkFirstLastName,
  checkUserCanBeRegistered,
  updateFcmToken,
  getFcmToken,
};

export default userDatabaseService;