// This is the tradesman controllers
import { userDatabaseService, tradesmanDatabaseService } from "../../../services/database/index.js";
import { logger } from "../../../config/index.js"

// Create a new tradesman
const createTradesman = async (req, res) => {
    try {
        const userData = req.body;
        const user = await userDatabaseService.createTradesmanUser(userData);
        res.status(201).json(user);
    } catch (error) {
        logger.error("Error creating tradesman: " + error.message);
        res.status(500).json({ error: error.message });
    }
}

// Delete a tradesman by ID
const deleteTradesmanById = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const user = await userDatabaseService.deleteUserById(id);
            if (user) {
                res.status(201).json(user);
            } else {
                throw new Error("User not found");
            }
        }
    } catch (error) {
        logger.error("Error deleting tradesman by ID: " + error.message);
        res.status(500).json({ error: error.message });
    }
}

// Update a tradesman by ID
const updateTradesmanById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (id && data) {
            const updatedUser = await userDatabaseService.updateUserById(id, data);
            res.status(201).json(updatedUser);
        } else {
            throw new Error("Incorrect params");  
        }
    } catch (error) {
        logger.error("Error updating tradesman by ID: " + error.message);
        res.status(500).json({ error: error.message });
    }
}

// Get a tradesman by ID
const getTradesmanById = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const user = await userDatabaseService.getUserById(id);
            if (user) {
                res.status(201).json(user);
            } else {
                throw new Error("User not found");
            }
        }
    } catch (erorr) {
        logger.error("Error getting tradesman by ID: " + error.message);
        res.status(500).json({ error: error.message });
    }
}
const tradesmanController = {
    createTradesman,
    deleteTradesmanById,
    updateTradesmanById,
    getTradesmanById,
};
export default tradesmanController;