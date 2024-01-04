// This is the export file for the auth routes

import homeownerAuthRoutes from './local/homeownerAuthRoutes.js';
import tradespersonAuthRoutes from './local/tradespersonAuthRoutes.js'; 
import express from 'express';
import { emailLoginAuthContoller, phoneNumberLoginAuthController } from '../../controllers/auth/index.js';

const authRoutes = express.Router();

/**
 * @swagger
 * /api/auth/login-email:
 *   post:
 *     summary: Login with Email
 *     description: Log in to the system using an email and password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
authRoutes.post('/login-email', emailLoginAuthContoller);

/**
 * @swagger
 * /api/auth/login-phone-number:
 *   post:
 *     summary: Login with Phone Number
 *     description: Log in to the system using a phone number and password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - password
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
authRoutes.post('/login-phone-number', phoneNumberLoginAuthController);

authRoutes.use('/homeowner', homeownerAuthRoutes);
authRoutes.use('/tradesperson', tradespersonAuthRoutes);

export default authRoutes;