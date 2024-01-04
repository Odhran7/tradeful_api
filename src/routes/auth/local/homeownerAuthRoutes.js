// These are the homeowner auth routes (local)

import express from "express";
import { registerHomeOwnerController } from "../../../controllers/auth/index.js";

const homeownerAuthRouter = express.Router();

/**
 * @swagger
 * /api/auth/homeowner/register-homeowner:
 *   post:
 *     summary: Register a new homeowner
 *     description: Allows for the creation of a new homeowner account.
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
 *               - propertyDetails
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Cityville"
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Password123!"
 *               role:
 *                 type: string
 *                 example: homeowner
 *               propertyDetails:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: Apartment
 *                   size:
 *                     type: string
 *                     example: "1200 sqft"
 *                   location:
 *                     type: string
 *                     example: "123 Main St, Cityville"
 *                   isBusiness:
 *                     type: boolean
 *                     example: false
 *     responses:
 *       201:
 *         description: Homeowner registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 homeOwner:
 *                   $ref: '#/components/schemas/HomeownerModel'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
homeownerAuthRouter.post("/register-homeowner", registerHomeOwnerController);

export default homeownerAuthRouter;