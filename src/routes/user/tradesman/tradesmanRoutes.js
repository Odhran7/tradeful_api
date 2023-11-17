// These are the routes for the tradesperson user
import { tradesmanController } from "../../../controllers/user/index.js";
import express from "express";

const tradesmanRouter = express.Router();
tradesmanRouter.post("/tradesman", tradesmanController.createTradesman);
tradesmanRouter.get("/tradesman/:id", tradesmanController.getTradesmanById);
tradesmanRouter.put("/tradesman/:id", tradesmanController.updateTradesmanById);


export default tradesmanRouter;