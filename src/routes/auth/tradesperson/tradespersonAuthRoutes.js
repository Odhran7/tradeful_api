// These are the routes for the tradesperson authentication

import express from 'express';
import tradespersonAuthController from '../../controllers/authController';

const tradespersonAuthRouter = express.Router();

// User Registration

tradespersonAuthRouter.post('/register', tradespersonAuthController.register);

// User login

tradespersonAuthRouter.post('/login', tradespersonAuthController.login);

// Get current user

tradespersonAuthRouter.post('/me', tradespersonAuthController.me);