// These are the unit tests for the homeowner database service.

import { userDatabaseService, homeownerDatabaseService } from '../../../../../services/database/index.js';
import dotenv from '../../../../../config/envConfig.js';
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

// Find homeowner by Id
describe('Update a homeowner by ID', () => {
  it('should update a homeowner by ID', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      address: '123 Main Street',
      email: 'russell.odhran@gmail.com',
      password: 'Password123!',
      role: 'homeowner',
      propertyDetails: {
        type: 'house',
        size: 'small',
        location: 'Dublin 1',
        isBusiness: false,
      },
    };
    const obj = await userDatabaseService.createHomeownerUser(userData);

    const newUser = obj.user;
    const homeowner = obj.homeowner;

    const userId = newUser._id;
    expect(userId).toBeDefined();
    expect(homeowner._id).toBeDefined();
    const updatedHomeowner = await homeownerDatabaseService.findHomeownerById(userId.toString());
    expect(updatedHomeowner.userId).toEqual(userId);
    // Delete the user
    await userDatabaseService.deleteUserById(newUser._id);
  });
});

// This test should update a homeowner by ID
describe("Update a homeowner's details by ID", () => {
  it('should update a homeowner by ID', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      address: '123 Main Street',
      email: 'russell.odhran@gmail.com',
      password: 'Password123!',
      role: 'tradesperson',
      propertyDetails: {
        type: 'house',
        size: 'small',
        location: 'Dublin 1',
        isBusiness: false,
      },
    };
    const obj = await userDatabaseService.createHomeownerUser(userData);
    const newUser = obj.user;
    const homeowner = obj.homeowner;

    const userId = homeowner.userId;
    expect(userId).toBeDefined();
    expect(homeowner._id).toBeDefined();
    const updatedHomeownerData = {
      type: 'apartment',
      size: 'medium',
      location: 'Dublin 2',
      isBusiness: true,
    };
    const updatedHomeowner = await homeownerDatabaseService.updateHomeownerById(
      userId.toString(),
      updatedHomeownerData
    );
    expect(updatedHomeowner.userId).toEqual(userId);
    // Delete the user
    await userDatabaseService.deleteUserById(newUser._id);
  });
});
