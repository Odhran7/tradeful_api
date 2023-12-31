// These are the homeowner auth routes (local)

import express from "express";
import { registerHomeOwnerController } from "../../../controllers/auth/index.js";

const homeownerAuthRouter = express.Router();

/**
 * @swagger
 * /register-homeowner:
 *   post:
 *     summary: Register a new homeowner
 *     description: This endpoint registers a new homeowner in the system.
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
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the homeowner
 *               lastName:
 *                 type: string
 *                 description: Last name of the homeowner
 *               email:
 *                 type: string
 *                 description: Email address of the homeowner
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the homeowner's account
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
 *       201:
 *         description: Homeowner registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 homeOwner:
 *                   $ref: '#/models/Homeowner'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error occurred during registration
 */
homeownerAuthRouter.post("/register-homeowner", registerHomeOwnerController);

export default homeownerAuthRouter;