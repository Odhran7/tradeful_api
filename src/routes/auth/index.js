// This is the export file for the auth routes

import homeownerAuthRoutes from './local/homeownerAuthRoutes.js';
import tradespersonAuthRoutes from './local/tradespersonAuthRoutes.js'; 
import express from 'express';

const authRoutes = express.Router();
authRoutes.use('/homeowner', homeownerAuthRoutes);
authRoutes.use('/tradesperson', tradespersonAuthRoutes);

export default authRoutes;