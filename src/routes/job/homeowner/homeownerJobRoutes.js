// These are the routes for the homeowner job

import express from "express";
import { homeownerJobController } from "../../../controllers/job/index.js";

// TODO: Add authMiddleware to all routes

const homeownerJobRouter = express.Router();

/**
 * @swagger
 * /api/job/homeowner/{userId}:
 *   post:
 *     summary: Create a new job for a homeowner
 *     description: Allows a homeowner to create a new job with specific details, linked to their user ID.
 *     tags: [Homeowner Jobs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Unique ID of the homeowner
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobTitle
 *               - jobDescription
 *               - jobLocation
 *               - jobCreationDate
 *               - jobQuote
 *               - jobServiceRequired
 *               - jobStatus
 *               - jobUrgency
 *             properties:
 *               jobTitle:
 *                 type: string
 *                 example: Fix leaking sink
 *               jobDescription:
 *                 type: string
 *                 example: The kitchen sink has a constant leak and needs repair.
 *               jobLocation:
 *                 type: string
 *                 example: 123 Main St, Anytown
 *               jobCreationDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-01
 *               jobQuote:
 *                 type: number
 *                 example: 150
 *               jobServiceRequired:
 *                 type: string
 *                 example: plumbing
 *               jobStatus:
 *                 type: string
 *                 example: pending
 *               jobUrgency:
 *                 type: string
 *                 example: urgent
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/JobModel'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
homeownerJobRouter.post("/:userId", homeownerJobController.homeownerCreateJob);

/**
 * @swagger
 * /api/job/homeowner/title/{jobId}:
 *   put:
 *     summary: Update job title
 *     description: Allows a homeowner to update the title of an existing job.
 *     tags: [Homeowner Jobs]
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
 *             properties:
 *               jobTitle:
 *                 type: string
 *                 example: Updated Job Title
 *     responses:
 *       201:
 *         description: Job title updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/JobModel'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
homeownerJobRouter.put("/title/:jobId", homeownerJobController.homeownerUpdateJobTitle);

/**
 * @swagger
 * /api/job/homeowner/description/{jobId}:
 *   put:
 *     summary: Update job description
 *     description: Allows a homeowner to update the description of an existing job.
 *     tags: [Homeowner Jobs]
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
 *             properties:
 *               jobDescription:
 *                 type: string
 *                 example: Updated Job Description
 *     responses:
 *       201:
 *         description: Job Description updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/JobModel'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
homeownerJobRouter.put("/description/:jobId", homeownerJobController.homeownerUpdateJobDescription);

/**
 * @swagger
 * /api/job/homeowner/quote/{jobId}:
 *   put:
 *     summary: Update job quote
 *     description: Allows a homeowner to update the quote of an existing job.
 *     tags: [Homeowner Jobs]
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
 *             properties:
 *               jobQuote:
 *                 type: number
 *                 example: 450
 *     responses:
 *       201:
 *         description: Job quote updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/JobModel'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
homeownerJobRouter.put("/quote/:jobId", homeownerJobController.homeownerUpdateJobQuote);

/**
 * @swagger
 * /api/job/homeowner/urgency/{jobId}:
 *   put:
 *     summary: Update job urgency
 *     description: Allows a homeowner to update the urgency of an existing job.
 *     tags: [Homeowner Jobs]
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
 *             properties:
 *               jobUrgency:
 *                 type: string
 *                 example: Urgent
 *     responses:
 *       201:
 *         description: Job urgency updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/JobModel'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
homeownerJobRouter.put("/urgency/:jobId", homeownerJobController.homeownerUpdateJobUrgency);

/**
 * @swagger
 * /api/job/homeowner/{jobId}:
 *   put:
 *     summary: Update an existing job
 *     description: Allows a homeowner to update the details of an existing job.
 *     tags: [Homeowner Jobs]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: The unique ID of the job to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobTitle:
 *                 type: string
 *                 description: The title of the job.
 *                 example: Fix leaking roof
 *               jobDescription:
 *                 type: string
 *                 description: A detailed description of the job.
 *                 example: There's a small leak in the kitchen ceiling that needs fixing.
 *               jobLocation:
 *                 type: string
 *                 description: The location where the job needs to be done.
 *                 example: 456 Elm St, Springtown
 *               jobCreationDate:
 *                 type: string
 *                 format: date
 *                 description: The date when the job was created.
 *                 example: 2024-02-20
 *               jobQuote:
 *                 type: number
 *                 description: The quoted price for the job.
 *                 example: 200
 *               jobServiceRequired:
 *                 type: string
 *                 description: The type of service required.
 *                 example: roofing
 *               jobStatus:
 *                 type: string
 *                 enum: [pending, confirmed, completed, cancelled]
 *                 description: The current status of the job.
 *                 example: confirmed
 *               jobStartDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the job.
 *                 example: 2024-03-01
 *               jobEndDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the job.
 *                 example: 2024-03-05
 *               jobUrgency:
 *                 type: string
 *                 enum: [urgent, semi-urgent, not urgent]
 *                 description: The urgency level of the job.
 *                 example: urgent
 *               jobPaymentInfo:
 *                 type: string
 *                 description: The ID of the payment information.
 *                 example: 5f8d04be1234567890abcdef
 *               jobHomeowner:
 *                 type: string
 *                 description: The ID of the homeowner who posted the job.
 *                 example: 5f7c39bd1234567890abcdef
 *               jobTradesperson:
 *                 type: string
 *                 description: The ID of the tradesperson assigned to the job.
 *                 example: 5f8d04be0987654321fedcba
 *     responses:
 *       201:
 *         description: Job updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobModel'
 *       400:
 *         description: Invalid input or job details.
 *       404:
 *         description: Job not found.
 *       500:
 *         description: Internal server error.
 */
homeownerJobRouter.put("/:jobId", homeownerJobController.homeownerUpdateJob);

/**
 * @swagger
 * /api/job/homeowner/{userId}:
 *   get:
 *     summary: Retrieve all jobs posted by a homeowner
 *     description: Fetches a list of all jobs associated with a specific homeowner's user ID.
 *     tags: [Homeowner Jobs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique ID of the homeowner
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: List of all jobs for the specified homeowner
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobModel'
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
homeownerJobRouter.get("/:userId", homeownerJobController.homeownerGetAllJobs);

/**
 * @swagger
 * /api/job/homeowner/{jobId}:
 *   delete:
 *     summary: Delete a job
 *     description: Allows a homeowner to delete a job by its unique ID.
 *     tags: [Homeowner Jobs]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: Unique ID of the job to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Job deleted successfully
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
homeownerJobRouter.delete("/:jobId", homeownerJobController.homeownerDeleteJob);


export default homeownerJobRouter;