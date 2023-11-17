import homeownerRoutes from './homeowner/homeownerRoutes.js';
import tradesmanRouter from './tradesman/tradesmanRoutes.js';
import userRouter from './user/userRoutes.js';
import express from 'express';

const apiRoutes = express.Router();
apiRoutes.use('/homeowner', homeownerRoutes);
apiRoutes.use('/tradesman', tradesmanRouter);
apiRoutes.use('/user', userRouter);

export default apiRoutes;