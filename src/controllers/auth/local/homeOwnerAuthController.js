// This is the local auth controller for the homeowner

import { logger } from "../../../config/index.js";
import { registerHomeOwnerService } from "../../../services/auth/index.js";

// Register a new homeowner
const registerHomeOwnerController = async (req, res) => {
    try {
        const homeOwnerData = req.body;
        const homeOwner = await registerHomeOwnerService(homeOwnerData);
        res.status(201).json({ homeOwner });
    } catch (error) {
        logger.error("Error registering homeowner" + error);
        res.status(500).json({ error: error.message });
    }
};

export default registerHomeOwnerController;
