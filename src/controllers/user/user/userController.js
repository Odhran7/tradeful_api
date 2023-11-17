import { userDatabaseService } from "../../../services/database/index.js";
import { logger } from "../../../config/index.js";

// Delete a user by ID
const deleteUserById = async (req, res) => {
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
        logger.error("Error deleting homeowner by ID: " + error.message);
        res.status(500).json({ error: error.message });
    }
}

// Update a user by id 
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (id && data) {
            const updatedUser = await userDatabaseService.updateUserById(id, data);
            res.status(201).json(updatedUser);
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        logger.error("Error updating homeowner by ID: " + error.message);
        res.status(500).json({ error: error.message });
    }
}

// Get a user by id
const getUserById = async (req, res) => {
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
    } catch (error) {
        logger.error("Error getting homeowner by ID: " + error.message);
        res.status(500).json({ error: error.message });
    }
}

const userController = {
    deleteUserById,
    updateUserById,
    getUserById
};

export default userController;