// These are the routes for the homeowner user
import { homeownerController } from "../../../controllers/user/index.js";
import express from "express";

const homeownerRouter = express.Router();

/**
 * @swagger
 * /homeowner:
 *   post:
 *     summary: Create a new homeowner
 *     description: Adds a new homeowner to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Homeowner created successfully
 *       400:
 *         description: Invalid input
 */
homeownerRouter.post("/homeowner", homeownerController.createHomeowner);

/**
 * @swagger
 * /homeowner/{id}:
 *   get:
 *     summary: Get a homeowner by ID
 *     description: Retrieves a homeowner from the database by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the homeowner to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Homeowner data retrieved successfully
 *       404:
 *         description: Homeowner not found
 */
homeownerRouter.get("/homeowner/:id", homeownerController.getHomeownerById);

/**
 * @swagger
 * /homeowner/{id}:
 *   put:
 *     summary: Update a homeowner by ID
 *     description: Modifies homeowner information in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the homeowner to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Homeowner updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Homeowner not found
 */
homeownerRouter.put("/homeowner/:id", homeownerController.updateHomeownerById);


export default homeownerRouter;