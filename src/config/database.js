// This is the config file for the database.

import dotenv from './envConfig.js';
import mongoose from 'mongoose';
import logger from './logger.js';


const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tradeful_development';
  try {
    await mongoose.connect(mongoURI);
    logger.info('MongoDB connected...');
  } catch (err) {
    logger.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;