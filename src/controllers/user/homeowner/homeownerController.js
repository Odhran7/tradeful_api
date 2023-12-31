// Homeowner route controllers are defined here
import { userDatabaseService } from "../../../services/database/index.js";
import { logger } from "../../../config/index.js";

// Create a new user
const createHomeowner = async (req, res) => {
    try {
        const userData = req.body;
        const user = await userDatabaseService.createHomeownerUser(userData);
        res.status(201).json({ user });
    } catch (error) {
        logger.error("Error creating homeowner: " + error.message);
        res.status(500).json({ error: error.message });
    }
}

// Get a homeowner by ID
const getHomeownerById = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const user = await userDatabaseService.getUserById(id);
            if (user) {
                res.status(201).json({ user });
            } else {
                throw new Error("User not found");
            }
        }
    } catch (error) {
        logger.error("Error getting homeowner by ID: " + error.message);
        res.status(500).json({ error: error.message });
    }
}

// Update a homeowner by ID
const updateHomeownerById = async (req, res) => {
    try {
        const id = req.params.id;
        const userData = req.body;
        if (id && userData) {
            const updatedUser = await userDatabaseService.updateUserById(id, userData);
            res.staus(201).json({ updatedUser });
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        logger.error("Error updating homeowner by ID: " + error.message);
        res.status(500).json({ error: error.message });
    }
}

const homeownerController = {
    createHomeowner,
    getHomeownerById,
    updateHomeownerById
};

export default homeownerController;