// This is the database service related to the tradesman model.

import { validateTradesperson } from "../../../../utils/validators/index.js";
import { TradespersonModel } from "../../../../models/profiles/index";
import { logger } from "../../../../config/index.js";

// Helper function for creating a tradesman
const createTradesperson = async (userId, tradeType, businessName, skills, qualifications) => {
    try {
        validateHomeowner(userId, propertyDetails);
        const tradesman = new TradespersonModel({userId, tradeType, businessName, skills, qualifications});
        await tradesman.save();
        return tradesman;
    } catch (error) {
        logger.error("Error creating tradesman: " + error.message);
        throw error;
    }
}

// This function returns a tradesman by id
const findTradespersonById = async (userId) => {
    try {
        const tradesman = await TradespersonModel.findById(userId);
        return tradesman;
    } catch (error) {
        logger.error("Error finding tradesman by id: " + error.message);
        throw error;
    }
}

// This function updates a tradesman by id
const updateTradespersonById = async (userId, tradeType, businessName, skills, qualifications) => {
    try {
        validateTradesperson(userId, tradeType, businessName, skills, qualifications);
        const tradesman = await TradespersonModel.findByIdAndUpdate(userId, {
            tradeType,
            businessName,
            skills,
            qualifications,
        });
        return tradesman;
    } catch (error) {
        logger.error("Error updating tradesman by id: " + error.message);
        throw error;
    }
}

// This function deletes a tradesman by id
const deleteTradespersonById = async (userId) => {
    try {
        const tradesman = await TradespersonModel.findByIdAndDelete(userId);
        return tradesman;
    } catch (error) {
        logger.error("Error deleting tradesman by id: " + error.message);
        throw error;
    
    }
}

export {
    createTradesperson,
    findTradespersonById,
    updateTradespersonById,
    deleteTradespersonById,
}