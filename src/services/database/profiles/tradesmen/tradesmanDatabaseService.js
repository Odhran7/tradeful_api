// This is the database service related to the tradesman model.

import { validateTradesperson } from "../../../../utils/validators/index.js";
import { TradespersonModel, UserModel } from "../../../../models/profiles/index";
import { logger } from "../../../../config/index.js";

// Helper function for creating a tradesman
const createTradesperson = async (userId, tradeType, businessName, skills, qualifications) => {
    try {
        validateTradesperson(userId, tradeType, businessName, skills, qualifications);
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
        const tradesman = await TradespersonModel.findOne({userId});
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
        const tradesman = await findTradespersonById(userId);
        const tradesmanId = tradesman._id;
        const newTradesman = await TradespersonModel.findByIdAndUpdate(tradesmanId, {
            tradeType,
            businessName,
            skills,
            qualifications,
        });
        return newTradesman;
    } catch (error) {
        logger.error("Error updating tradesman by id: " + error.message);
        throw error;
    }
}


export {
    createTradesperson,
    findTradespersonById,
    updateTradespersonById,
}