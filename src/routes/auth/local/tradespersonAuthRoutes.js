// These are the routes for the tradesperson auth routes (local)

import express from "express";
import { registerHomeOwnerController } from "../../../controllers/auth/index.js";

const tradespersonAuthRouter = express.Router();

tradespersonAuthRouter.post("/register-tradesperson", registerHomeOwnerController);

export default tradespersonAuthRouter;