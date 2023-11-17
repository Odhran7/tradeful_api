// This is a unit test for the database connection

import mongoose from 'mongoose';
import dotenv from '../../../config/envConfig';


describe('Database Connection', () => {
  const timeout = 20000;
  beforeAll(async () => {
    const dbURI = process.env.MONGO_URI;
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
  }, timeout);

  afterAll(async () => {
    await mongoose.connection.close();
  }, timeout);

  test('should connect to the MongoDB database', async () => {
    const status = mongoose.connection.readyState;
    expect(status).toBe(1);
  }, timeout);
});
