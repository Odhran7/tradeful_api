// This is the auth register services for tradesperson (local)
import { logger } from "../../../../config/index.js";
import { userDatabaseService } from "../../../database/index.js";

const registerTradesperson = async (tradespersonData) => {
    try {
        return await userDatabaseService.createTradespersonUser(tradespersonData);
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

export default registerTradesperson;
