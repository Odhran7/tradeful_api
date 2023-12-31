// This is the user login service file
import { userDatabaseService } from "../../../database/index.js"
import bcrypt from 'bcryptjs';
import { logger } from "../../../../config/index.js";
import generateToken from "../../../../utils/auth/generateToken.js";

// This function logs in a homeowner user by email
const loginUserEmail = async (email, password) => {
    try {
        const user = await userDatabaseService.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        };
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error('Incorrect password');
        }
        const token = generateToken(user);
        return { user, token };
    } catch (error) {
        logger.error('Error logging in homeowner user: ' + error.message);
        throw error;
    }
};

// This function logs in a homeowner user by phone number
const loginUserPhoneNumber = async (phoneNumber, password) => {
    try {
        const user = await userDatabaseService.getUserByPhoneNumber(phoneNumber);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error('Incorrect password');
        }
        const token = generateToken(user);
        return { user, token };
    } catch (error) {
        logger.error('Error logging in homeowner user: ' + error.message);
        throw error;
    }
};

export {
    loginUserEmail,
    loginUserPhoneNumber,
}