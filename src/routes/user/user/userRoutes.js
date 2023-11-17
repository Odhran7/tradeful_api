// These are the routes for the user
import { userController } from "../../../controllers/user/index.js";
import express from "express";

const userRoutes = express.Router();

userRoutes.get("/user/:id", userController.getUserById);
userRoutes.put("/user/:id", userController.updateUserById);
userRoutes.delete("/user/:id", userController.deleteUserById);

export default userRoutes;