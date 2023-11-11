// These are the routes for the homeowner authentication

import express from 'express';
import homeownerAuthController from '../../controllers/authController';

const homeownerAuthRouter = express.Router();

// User Registration

homeownerAuthRouter.post('/register', homeownerAuthController.register);

// User login 

homeownerAuthRouter.post('/login', homeownerAuthController.login);

// Get current user

homeownerAuthRouter.post('/me', homeownerAuthController.me);


export default authRouter;