// This is the database service related to the homeowner model.

import { logger } from "../../../../config/index.js";
import { validateHomeowner } from "../../../../utils/validators/index.js";
import { HomeownerModel } from "../../../../models/profiles/index";

// Helper function for creating a homeowner
const createHomeowner = async (userId, propertyDetails) => {
    try {
        validateHomeowner(userId, propertyDetails);
        const homeowner = new HomeownerModel({userId, propertyDetails});
        await homeowner.save();
        return homeowner;
    } catch (error) {
        logger.error("Error creating homeowner: " + error.message);
        throw error;
    }
}

// This function returns a homeowner by id
const findHomeownerById = async (userId) => {
    try {
        const homeowner = await HomeownerModel.findOne({userId});
        return homeowner;
    } catch (error) {
        logger.error("Error finding homeowner by id: " + error.message);
        throw error;
    }
}

// This function updates a homeowner by id
const updateHomeownerById = async (userId, propertyDetails) => {
    try {
        validateHomeowner(userId, propertyDetails);
        const homeowner = await findHomeownerById(userId);
        const homeownerId = homeowner._id;
        const newHomeowner = await HomeownerModel.findByIdAndUpdate(homeownerId, {
            propertyDetails,
        });
        return newHomeowner;
    } catch (error) {
        logger.error("Error updating homeowner by id: " + error.message);
        throw error;   
    }
}

export {
    createHomeowner,
    findHomeownerById,
    updateHomeownerById,
}