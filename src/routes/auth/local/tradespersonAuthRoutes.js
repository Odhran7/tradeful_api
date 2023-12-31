// These are the routes for the tradesperson auth routes (local)

import express from "express";
import { registerHomeOwnerController } from "../../../controllers/auth/index.js";

const tradespersonAuthRouter = express.Router();

/**
 * @swagger
 * /register-tradesperson:
 *   post:
 *     summary: Register a new tradesperson
 *     description: This endpoint registers a new tradesperson in the system.
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
 *               - password
 *               - tradeType
 *               - businessName
 *               - skills
 *               - qualifications
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the tradesperson
 *               lastName:
 *                 type: string
 *                 description: Last name of the tradesperson
 *               email:
 *                 type: string
 *                 description: Email address of the tradesperson
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the tradesperson's account
 *               tradeType:
 *                 type: string
 *                 description: Type of trade the tradesperson specializes in
 *               businessName:
 *                 type: string
 *                 description: Name of the tradesperson's business
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of skills possessed by the tradesperson
 *               qualifications:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of qualifications of the tradesperson
 *     responses:
 *       201:
 *         description: Tradesperson registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tradesperson:
 *                   $ref: '#/models/Tradesperson'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error occurred during registration
 */
tradespersonAuthRouter.post("/register-tradesperson", registerHomeOwnerController);

export default tradespersonAuthRouter;