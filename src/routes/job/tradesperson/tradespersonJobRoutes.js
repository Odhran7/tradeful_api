// These are the routes for the tradesperson job 

import express from 'express';
import { tradespersonJobController } from "../../../controllers/job/index.js";

// TODO: Add authMiddleware to routes

const tradespersonJobRouter = express.Router();

/**
 * @swagger
 * /api/job/tradesperson/{tradespersonId}:
 *   post:
 *     summary: Accept a job
 *     description: Allows a tradesperson to accept a job using their ID and the job ID.
 *     tags: [Tradesperson Jobs]
 *     parameters:
 *       - in: path
 *         name: tradespersonId
 *         required: true
 *         description: Unique ID of the tradesperson
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobId
 *             properties:
 *               jobId:
 *                 type: string
 *                 description: The unique ID of the job to be accepted
 *                 example: 5f7c39bd1234567890abcdef
 *     responses:
 *       201:
 *         description: Job accepted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobModel'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Job or tradesperson not found
 *       500:
 *         description: Internal server error
 */
tradespersonJobRouter.post('/:tradespersonId', tradespersonJobController.tradespersonAcceptJob);


/**
 * @swagger
 * /api/job/tradesperson/status/{jobId}:
 *   put:
 *     summary: Update job status
 *     description: Allows a tradesperson to update the status of a job.
 *     tags: [Tradesperson Jobs]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: Unique ID of the job
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobStatus
 *             properties:
 *               jobStatus:
 *                 type: string
 *                 enum: [pending, confirmed, completed, cancelled]
 *                 description: The new status of the job
 *                 example: confirmed
 *     responses:
 *       201:
 *         description: Job status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobModel'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
tradespersonJobRouter.put('/:jobId', tradespersonJobController.tradespersonUpdateJobStatus);

/**
 * @swagger
 * /api/job/tradesperson/status/{jobId}:
 *   put:
 *     summary: Update job status
 *     description: Allows a tradesperson to update the status of a job.
 *     tags: [Tradesperson Jobs]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: Unique ID of the job
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobStatus
 *             properties:
 *               jobStatus:
 *                 type: string
 *                 enum: [pending, confirmed, completed, cancelled]
 *                 description: The new status of the job
 *                 example: confirmed
 *     responses:
 *       201:
 *         description: Job status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobModel'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
tradespersonJobRouter.put("/status/:jobId", tradespersonJobController.tradespersonUpdateJobStatus);

/**
 * @swagger
 * /api/job/tradesperson/{service}:
 *   get:
 *     summary: Get all service jobs
 *     description: Fetches all jobs for a particular service category.
 *     tags: [Tradesperson Jobs]
 *     parameters:
 *       - in: path
 *         name: service
 *         required: true
 *         description: The service category of the jobs
 *         schema:
 *           type: string
 *           enum: [plumbing, electrical, carpentry, etc.]
 *     responses:
 *       200:
 *         description: List of all jobs for the specified service
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobModel'
 *       400:
 *         description: Invalid service category
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
tradespersonJobRouter.get('/:service', tradespersonJobController.tradespersonGetAllServiceJobs);

export default tradespersonJobRouter;