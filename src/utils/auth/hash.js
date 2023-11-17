// This util hashes a password using bcryptjs.

import bcrypt from 'bcryptjs';
import { logger } from '../../config/index.js';

// Hashes password with salt 10
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        logger.error('Error hashing password: ' + error.message);
        throw error;
    }
}

export default hashPassword;