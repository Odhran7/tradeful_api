// This is the auth register services for tradesperson (local)
import { logger } from "../../../../config/index.js";
import { userDatabaseService } from "../../../database/index.js";

const registerHomeOwner = async (homeOwnerData) => {
    try {
        return await userDatabaseService.createHomeownerUser(homeOwnerData);
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

export default registerHomeOwner;