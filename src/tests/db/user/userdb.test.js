// This is a unit test for the database connection for the users table

import connectDB from '../../../config/database';
import {
  createHomeownerUser,
  createTradespersonUser,
  getUserById,
  updateUserById,
} from '../../../services/database/index';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Create Homeowner user test
describe('Create a Homeowner user', () => {
  it('should create a Homeowner user', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      address: '123 Main Street',
      email: 'russell.odhran@gmail.com',
      password: 'password',
      role: 'homeowner',
      propertyDetails: {
        type: 'house',
        size: 'small',
        location: 'Dublin 1',
        isBusiness: false,
      },
    };

    const userId = await createHomeownerUser(userData);
    expect(userId).toBeDefined();
  });
});

// Create Tradesperson user test
describe('Create a tradesperson user', () => {
  it('should create a tradesperson user', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      address: '123 Main Street',
      email: 'russell.odhran@gmail.com',
      password: 'password',
      role: 'tradesperson',
      tradeType: 'plumber',
      businessName: 'John Doe Plumbing',
      skills: ['plumbing', 'electrical'],
      qualifications: ['plumbing', 'electrical'],
    };
    const userId = await createTradespersonUser(userData);
    expect(userId).toBeDefined();
  });
});

// Get user by id test
describe('Get User By ID', () => {
    it('should retrieve a user by ID', async () => {
      const userData = {
        firstName: 'Micheal',
        lastName: 'Jeeb',
        phoneNumber: '1234567890',
        address: '123 Main Street',
        email: 'russell.odhran@gmail.com',
        password: 'password',
        role: 'homeowner',
        propertyDetails: {
          type: 'house',
          size: 'small',
          location: 'Dublin 1',
          isBusiness: false,
        },
      };
      const userId = await createHomeownerUser(userData);
      const user = await getUserById(userId);
      expect(user).toBeDefined();
      expect(user._id.toString()).toBe(userId);

    });
  });
  
  // Updates user by id test
  describe('Update User By ID', () => {
    it('should update a user\'s information', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        address: '123 Main Street',
        email: 'russell.3odhran@gmail.com',
        password: 'password',
        role: 'homeowner',
        propertyDetails: {
          type: 'house',
          size: 'small',
          location: 'Dublin 1',
          isBusiness: false,
        },
      };
      const userId = await createHomeownerUser(userData);
  
      const updatedData = {
        firstName: 'Mary',
        lastName: 'dhdhd',
        phoneNumber: '1234567840',
        address: '1243 Main Street',
        email: 'russel2l.odhran@gmail.com',
        password: 'password',
        role: 'homeowner',
        propertyDetails: {
          type: 'house',
          size: 'small',
          location: 'Dublin 1',
          isBusiness: false,
        },
      };;
      await updateUserById(userId, updatedData);
  
      const updatedUser = await getUserById(userId);
      expect(updatedUser).toBeDefined();
    });
  });

// Deletes a user by id
describe('Delete User By ID', () => {
it('should delete a user by ID', async () => {
    const userData = {
    firstName: 'Mary',
    lastName: 'Doe',
    phoneNumber: '1233567890',
    address: '123 Main Stsreet',
    email: 'russell.odhrans@gmail.com',
    password: 'password',
    role: 'homeowner',
    propertyDetails: {
        type: 'house',
        size: 'small',
        location: 'dd 1',
        isBusiness: false,
    },
    };
    const userId = await createHomeownerUser(userData);
    await deleteUserById(userId);
    const deletedUser = await getUserById(userId);
    expect(deletedUser).toBeNull();
});
});


