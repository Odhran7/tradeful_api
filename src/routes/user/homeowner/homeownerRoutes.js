// These are the routes for the homeowner user
import { homeownerController } from "../../../controllers/user/index.js";
import express from "express";

const homeownerRouter = express.Router();

/**
 * @swagger
 * /api/user/homeowner:
 *   post:
 *     summary: Create a new homeowner
 *     description: Adds a new homeowner to the database.
 *     tags: [Homeowners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - propertyDetails
 *             properties:
 *               userId:
 *                 type: string
 *               propertyDetails:
 *                 type: object
 *                 required:
 *                   - type
 *                   - size
 *                   - location
 *                   - isBusiness
 *                 properties:
 *                   type:
 *                     type: string
 *                   size:
 *                     type: string
 *                   location:
 *                     type: string
 *                   isBusiness:
 *                     type: boolean
 *     responses:
 *       201:
 *         description: Homeowner created successfully
 *       400:
 *         description: Invalid input
 */

homeownerRouter.post("/", homeownerController.createHomeowner);

/**
 * @swagger
 * /api/user/homeowner/{id}:
 *   get:
 *     summary: Get a homeowner by ID
 *     description: Retrieves a homeowner from the database by their unique ID.
 *     tags: [Homeowners]
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 propertyDetails:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     size:
 *                       type: string
 *                     location:
 *                       type: string
 *                     isBusiness:
 *                       type: boolean
 *       404:
 *         description: Homeowner not found
 */

homeownerRouter.get("/:id", homeownerController.getHomeownerById);

/**
 * @swagger
 * /api/user/homeowner/{id}:
 *   put:
 *     summary: Update a homeowner by ID
 *     description: Modifies homeowner information in the database.
 *     tags: [Homeowners]
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
 *               propertyDetails:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                   size:
 *                     type: string
 *                   location:
 *                     type: string
 *                   isBusiness:
 *                     type: boolean
 *     responses:
 *       200:
 *         description: Homeowner updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Homeowner not found
 */
homeownerRouter.put("/:id", homeownerController.updateHomeownerById);


export default homeownerRouter;