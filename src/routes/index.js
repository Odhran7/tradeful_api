// This file exports the routes for the application

import authRoutes from "./auth/index.js";
import express from "express";
import userRoutes from "./user/index.js";
import jobRoutes from "./job/index.js";

const apiRoutes = express.Router();
apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/user", userRoutes);
apiRoutes.use("/job", jobRoutes)

export default apiRoutes;