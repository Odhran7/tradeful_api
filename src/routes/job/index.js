import homeownerJobRouter from "./homeowner/homeownerJobRoutes.js"
import tradespersonJobRouter from "./tradesperson/tradespersonJobRoutes.js";
import express from "express";

const jobRoutes = express.Router();
jobRoutes.use("/homeowner", homeownerJobRouter);
jobRoutes.use("/tradesperson", tradespersonJobRouter);

export default jobRoutes;