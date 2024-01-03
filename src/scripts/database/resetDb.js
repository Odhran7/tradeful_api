// This is a script used to reset the database

import mongoose from 'mongoose';
import { logger } from '../../config/index.js';
import { UserModel } from '../../models/index.js';
import { TradespersonModel } from '../../models/index.js';
import { HomeownerModel } from '../../models/index.js';
import dotenv from '../../config/envConfig.js';

const resetDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to database');
    await UserModel.deleteMany();
    await TradespersonModel.deleteMany();
    await HomeownerModel.deleteMany();
    logger.info('Database reset');
  } catch (error) {
    logger.error('Error resetting database: ' + error.message);
    throw error;
  } finally {
    mongoose.connection.close();
  }
};

resetDb();
