// This file exports the routes for the application

import authRoutes from "./auth/index.js";
import express from "express";
import userRoutes from "./user/index.js";

const apiRoutes = express.Router();
apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/user", userRoutes);

export default apiRoutes;