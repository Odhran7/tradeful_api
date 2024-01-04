import homeownerRoutes from './homeowner/homeownerRoutes.js';
import tradesmanRouter from './tradesman/tradesmanRoutes.js';
import userRouter from './user/userRoutes.js';
import express from 'express';

const profileRoutes = express.Router();
profileRoutes.use('/homeowner', homeownerRoutes);
profileRoutes.use('/tradesman', tradesmanRouter);
profileRoutes.use('/', userRouter);

export default profileRoutes;