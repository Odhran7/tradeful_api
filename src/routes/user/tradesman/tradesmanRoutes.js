// These are the routes for the tradesperson user
import { tradesmanController } from "../../../controllers/user/index.js";
import express from "express";

const tradesmanRouter = express.Router();

/**
 * @swagger
 * /api/user/tradesman:
 *   post:
 *     summary: Create a new tradesman
 *     description: Adds a new tradesman to the database.
 *     tags: [Tradesperson]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - tradeType
 *               - businessName
 *               - skills
 *               - qualifications
 *             properties:
 *               userId:
 *                 type: string
 *               tradeType:
 *                 type: string
 *               businessName:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               qualifications:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Tradesman created successfully
 *       400:
 *         description: Invalid input
 */
tradesmanRouter.post("/", tradesmanController.createTradesman);

/**
 * @swagger
 * /api/user/tradesman/{id}:
 *   get:
 *     summary: Get a tradesman by ID
 *     description: Retrieves a tradesman from the database by their unique ID.
 *     tags: [Tradesperson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the tradesman to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tradesman data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 tradeType:
 *                   type: string
 *                 businessName:
 *                   type: string
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: string
 *                 qualifications:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Tradesman not found
 */
tradesmanRouter.get("/:id", tradesmanController.getTradesmanById);

/**
 * @swagger
 * /api/user/tradesman/{id}:
 *   put:
 *     summary: Update a tradesman by ID
 *     description: Modifies tradesman information in the database.
 *     tags: [Tradesperson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the tradesman to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tradeType:
 *                 type: string
 *               businessName:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               qualifications:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Tradesman updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Tradesman not found
 */
tradesmanRouter.put("/:id", tradesmanController.updateTradesmanById);


export default tradesmanRouter;