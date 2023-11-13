// This is a unit test for the database connection for the users table

import {
  createHomeownerUser,
  createTradespersonUser,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../../../services/database/index';
import dotenv from '../../../config/envConfig';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Create Homeowner user test
describe('Create a Homeowner user', () => {
  it('should create a Homeowner user', async () => {
    const userData = {
      firstName: 'James',
      lastName: 'Jeep',
      phoneNumber: '1232987890',
      address: '1 Malahide Street',
      email: 'russell.odn@gmail.com',
      password: 'Password123!',
      role: 'homeowner',
      propertyDetails: {
        type: 'house',
        size: 'small',
        location: 'Dublin 1',
        isBusiness: false,
      },
    };

    const obj = await createHomeownerUser(userData);
    const newUser = obj.user;
    const homeowner = obj.homeowner;

    expect(newUser._id).toBeDefined();
    expect(homeowner._id).toBeDefined();
    // Delete the user
    await deleteUserById(newUser._id);
  });
});

// Create Tradesperson user test
describe('Create a tradesperson user', () => {
  it('should create a tradesperson user', async () => {
    const userData = {
      firstName: 'jjd',
      lastName: 'dfdf',
      phoneNumber: '1234997890',
      address: '123 Main Street',
      email: 'd.odhran@gmail.com',
      password: 'Password123!',
      role: 'tradesperson',
      tradeType: 'plumber',
      businessName: 'John Doe Plumbing',
      skills: ['plumbing', 'electrical'],
      qualifications: ['plumbing', 'electrical'],
    };
    const obj = await createTradespersonUser(userData);

    const newUser = obj.user;
    const tradesman = obj.tradesman;

    expect(newUser._id).toBeDefined();
    expect(tradesman._id).toBeDefined();
    // Delete the user
    await deleteUserById(newUser._id);
  });
});

// Get user by id test
describe('Get User By ID', () => {
  it('should retrieve a user by ID', async () => {
    const userData = {
      firstName: 'djhk',
      lastName: 'Jeeb',
      phoneNumber: '1234567588',
      address: '123 Main Street',
      email: 'russell.ddddfd@gmail.com',
      password: 'Password123!',
      role: 'homeowner',
      propertyDetails: {
        type: 'house',
        size: 'small',
        location: 'Dublin 1',
        isBusiness: false,
      },
    };
    const obj = await createHomeownerUser(userData);
    const newUser = obj.user;
    const homeowner = obj.homeowner;
    const userId = newUser._id;
    const user = await getUserById(userId);
    expect(user).toBeDefined();
    expect(homeowner._id).toBeDefined();
    expect(user._id).toEqual(userId);
    // Delete the user
    await deleteUserById(userId);
  });
});

// Updates user by id test
describe('Update User By ID', () => {
  it("should update a user's information", async () => {
    const userData = {
      firstName: 'dsfkljds',
      lastName: 'Dddoe',
      phoneNumber: '1234256190',
      address: '123 Main Street',
      email: 'russeww33n@gmail.com',
      password: 'Password123!',
      role: 'homeowner',
      propertyDetails: {
        type: 'house',
        size: 'small',
        location: 'Dublin 1',
        isBusiness: false,
      },
    };
    const obj = await createHomeownerUser(userData);
    const newUser = obj.user;
    const homeowner = obj.homeowner;

    const userId = newUser._id;

    const updatedData = {
      firstName: 'Mary',
      lastName: 'dhdhd',
      phoneNumber: '12345311840',
      address: '1243 Main Street',
      email: 'fdfsfd33.odhran@gmail.com',
      password: 'Password123!',
      role: 'homeowner',
    };
    await updateUserById(userId, updatedData);

    const updatedUser = await getUserById(userId);
    expect(updatedUser).toBeDefined();
    // Delete the user
    await deleteUserById(userId);
  });
});

// Deletes a user by id
describe('Delete User By ID', () => {
  it('should delete a user by ID', async () => {
    const userData = {
      firstName: 'Mary',
      lastName: 'Doe',
      phoneNumber: '1233520000',
      address: '123 Main Stsreet',
      email: 'rsdfknasdlkf@gmail.com',
      password: 'Password123!',
      role: 'homeowner',
      propertyDetails: {
        type: 'house',
        size: 'small',
        location: 'dd 1',
        isBusiness: false,
      },
    };
    const obj = await createHomeownerUser(userData);

    const newUser = obj.user;
    const homeowner = obj.homeowner;

    const userId = newUser._id;
    await deleteUserById(userId);
    const deletedUser = await getUserById(userId);
    expect(deletedUser).toBeNull();
  });
});

// Prevent duplicate users
describe('Prevent duplicate users', () => {
  it('should prevent duplicate users', async () => {
    const newUserOneData = {
      firstName: 'Mary',
      lastName: 'Doe',
      phoneNumber: '1233520000',
      address: '123 Main Stsreet',
      email: 'rsdfknasdlkf@gmail.com',
      password: 'Password123!',
      role: 'homeowner',
      propertyDetails: {
        type: 'house',
        size: 'small',
        location: 'dd 1',
        isBusiness: false,
      },
    };

    const newUserTwoData = {
      firstName: 'Mary',
      lastName: 'Doe',
      phoneNumber: '1233520000',
      address: '123 Main Stsreet',
      email: 'rsdfknasdlkf@gmail.com',
      password: 'Password123!',
      role: 'homeowner',
      propertyDetails: {
        type: 'house',
        size: 'small',
        location: 'dd 1',
        isBusiness: false,
      },
    };

    const obj = await createHomeownerUser(newUserOneData);
    const newUserOne = obj.user;

    const newUserOneId = newUserOne._id;
    expect(newUserOneId).toBeDefined();
    await expect(async () => {
      await createHomeownerUser(newUserTwoData);
    }).rejects.toThrow('User already exists');

    // Delete the user
    await deleteUserById(newUserOneId);
  });
});
