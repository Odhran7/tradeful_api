// This util is used to generate a token for a user.

import jwt from 'jsonwebtoken';
import { logger } from "../../config/index.js";
import dotenv from "../../config/envConfig.js";

const generateToken = (user) => {
  try {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '120d',
      }
    );
    return token;
  } catch (error) {
    logger.error('Error generating token: ' + error.message);
    throw error;
  }
}

export default generateToken;