// These are the routes for the tradesperson auth routes (local)

import express from "express";
import { registerTradespersonController } from "../../../controllers/auth/index.js";

const tradespersonAuthRouter = express.Router();

/**
 * @swagger
 * /api/auth/tradesperson/register-tradesperson:
 *   post:
 *     summary: Register a new tradesperson
 *     description: Allows for the creation of a new tradesperson account.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - address
 *               - email
 *               - password
 *               - role
 *               - tradeType
 *               - businessName
 *               - skills
 *               - qualifications
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jane
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *               address:
 *                 type: string
 *                 example: "456 Side St, Townville"
 *               email:
 *                 type: string
 *                 example: janedoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "strongpassword123"
 *               role:
 *                 type: string
 *                 example: tradesperson
 *               tradeType:
 *                 type: string
 *                 example: plumbing
 *               businessName:
 *                 type: string
 *                 example: "Jane's Plumbing"
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["pipe installation", "leak repair"]
 *               qualifications:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Certified Plumber", "5 years experience"]
 *     responses:
 *       201:
 *         description: Tradesperson registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tradesperson:
 *                   $ref: '#/components/schemas/TradespersonModel'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
tradespersonAuthRouter.post("/register-tradesperson", registerTradespersonController);

export default tradespersonAuthRouter;