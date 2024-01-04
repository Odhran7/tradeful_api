// These are the routes for the user
import { userController } from "../../../controllers/user/index.js";
import express from "express";

const userRouter = express.Router();

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Fetches a user's details using their unique identifier.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.get("/:id", userController.getUserById);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user's details
 *     description: Allows for updating the details of a user identified by their unique ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the user to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.put("/:id", userController.updateUserById);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Removes a user from the database using their unique identifier.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the user to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.delete("/:id", userController.deleteUserById);

export default userRouter;