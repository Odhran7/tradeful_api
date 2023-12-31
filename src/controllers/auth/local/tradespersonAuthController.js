// This is the local auth controller for the tradesperson

import { logger } from "../../../config/index.js";
import { registerTradespersonService } from "../../../services/auth/index.js";

// Register a new tradesperson
const registerTradespersonController = async (req, res) => {
    try {
        const tradespersonData = req.body;
        const tradesperson = await registerTradespersonService(tradespersonData);
        res.status(201).json({ tradesperson });
    } catch (error) {
        logger.error("Error registering tradesperson" + error);
        res.status(500).json({ error: error.message });
    }
};

export default registerTradespersonController;