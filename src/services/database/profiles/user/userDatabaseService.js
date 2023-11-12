// This is the database schema related to the user model.
import { UserModel } from "../../../../models/profiles/index.js";
import { logger } from "../../../../config";
import hashPassword from "../../../../utils/auth/hash.js";
import { validateUser } from "../../../../utils/validators/index.js";
import { createHomeowner } from "../homeowner/homeownerDatabaseService.js";
import { createTradesperson } from "../tradesmen/tradesmanDatabaseService.js";

// Create Homeowner User
const createHomeownerUser = async (data) => {
    try {
        const {
            firstName,
            lastName,
            phoneNumber,
            address,
            email,
            password,
            role,
            propertyDetails,
        } = data;
        validateUser({firstName, lastName, phoneNumber, address, email, password, role})
        const hashedPassword = await hashPassword(password);
        const user = new UserModel(firstName, lastName, phoneNumber, address, email, hashedPassword, role);
        await user.save();
        const userId = user._id;

        const homeowner = await createHomeowner(userId, propertyDetails);
        return userId;
    } catch {
        logger.error("Error creating homeowner user: " + error.message);
        throw error;
    }
}

// Create Tradesperson User
const createTradespersonUser = async (data) => {
    try {
        const {
            firstName,
            lastName,
            phoneNumber,
            address,
            email,
            password,
            role,
            tradeType,
            businessName,
            skills,
            qualifications,
        } = data;
        


        const hashedPassword = await hashPassword(password);

        const user = new UserModel(firstName, lastName, phoneNumber, address, email, hashedPassword, role);
        await user.save();
        const userId = user._id;

        const tradesman = await createTradesperson(userId, tradeType, businessName, skills, qualifications);
        return userId;
    } catch {
        logger.error("Error creating homeowner user: " + error.message);
        throw error;
    }
}

// Find a user by ID
const getUserById = async (userId) => {
    try {
        const user = await UserModel.findById(userId);
        return user;
    } catch (error) {
        logger.error("Error finding user by ID: " + error.message);
        throw error;
    }
}

// Update a user by ID
const updateUserById = async (userId, data) => {
    try {
        const {
            firstName,
            lastName,
            phoneNumber,
            address,
            email,
            password,
            role,
        } = data;
        validateUser({firstName, lastName, phoneNumber, address, email, password, role})
        const hashedPassword = await hashPassword(password);
        const user = await UserModel.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            phoneNumber,
            address,
            email,
            password: hashedPassword,
            role,
        });
        return user;
    } catch (error) {
        logger.error("Error updating user by ID: " + error.message);
        throw error;
    }
}

// Delete a user by ID
const deleteUserById = async (userId) => {
    try {
        const user = await UserModel.findByIdAndDelete(userId);
        return user;
    } catch (error) {
        logger.error("Error deleting user by ID: " + error.message);
        throw error;
    }
}
export {
    createHomeownerUser,
    createTradespersonUser,
    deleteUserById,
    getUserById,
    updateUserById
}