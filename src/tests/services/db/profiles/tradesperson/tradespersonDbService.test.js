// These are the unit tests for the homeowner database service.

import { tradesmanDatabaseService, userDatabaseService } from '../../../../../services/database/index';
import dotenv from '../../../../../config/envConfig';
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

// Find Tradesperson by Id
describe('Find a tradesperson by ID', () => {
  it('find a tradesperson by ID', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      address: '123 Main Street',
      email: 'russell.odhran@gmail.com',
      password: 'Password123!',
      role: 'tradesperson',
      tradeType: 'plumber',
      businessName: 'John Doe Plumbing',
      skills: ['plumbing', 'electrical'],
      qualifications: ['plumbing', 'electrical'],
    };
    const obj = await userDatabaseService.createTradespersonUser(userData);

    const newUser = obj.user;
    const tradesman = obj.tradesman;

    const userId = tradesman.userId;
    expect(userId).toBeDefined();
    const tradesperson = await tradesmanDatabaseService.findTradespersonById(userId.toString());
    const tradespersonId = tradesperson.userId;
    expect(tradesperson.userId).toEqual(userId);
    // Delete the user
    await userDatabaseService.deleteUserById(newUser._id);
  });
});

// This test should update a tradesperson by ID
describe("Update a tradesperson's details by ID", () => {
  it('should update a tradesperson by ID', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      address: '123 Main Street',
      email: 'russell.odhran@gmail.com',
      password: 'Password123!',
      role: 'tradesperson',
      tradeType: 'plumber',
      businessName: 'John Doe Plumbing',
      skills: ['plumbing', 'electrical'],
      qualifications: ['plumbing', 'electrical'],
    };
    const obj = await userDatabaseService.createTradespersonUser(userData);

    const newUser = obj.user;
    const tradesman = obj.tradesman;

    const userId = tradesman.userId;  
    expect(userId).toBeDefined();
    const updatedTradesPersonData = {
      tradeType: 'electrician',
      businessName: 'John Doe Electrical',
      skills: ['electrical'],
      qualifications: ['electrical'],
    };
    const updatedTradesperson = await tradesmanDatabaseService.updateTradespersonById(
      userId.toString(),
        updatedTradesPersonData.tradeType,
        updatedTradesPersonData.businessName,
        updatedTradesPersonData.skills,
        updatedTradesPersonData.qualifications,
    );
    expect(updatedTradesperson.userId).toEqual(userId);

    // Delete the user
    await userDatabaseService.deleteUserById(newUser._id);
  });
});

