// These are the homeowner auth routes (local)

import express from "express";
import { registerHomeOwnerController } from "../../../controllers/auth/index.js";

const homeownerAuthRouter = express.Router();

homeownerAuthRouter.post("/register-homeowner", registerHomeOwnerController);

export default homeownerAuthRouter;