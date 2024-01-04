// This is the controller for the jobs database (tradesperson)

import { logger } from "../../../config/index.js";
import { jobDatabaseService } from "../../../services/database/index.js";
import envConfig from "../../../config/envConfig.js";

// Accept a job

const tradespersonAcceptJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const tradespersonId = req.params.tradespersonId;
        if (jobId && tradespersonId) {
            const job = await jobDatabaseService.acceptJob(jobId, tradespersonId);
            res.status(201).json(job);
        } else {
            throw new Error("Job not found");
        }
    } catch (error) {
        logger.error("Error accepting job: " + error.message);
        res.status(500).json({ error: error.message });
    }
};

// Status

const tradespersonUpdateJobStatus = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const jobStatus = req.body.jobStatus;
        if (jobId && jobStatus) {
            const job = await jobDatabaseService.updateJobStatusById(jobId, jobStatus);
            res.status(201).json(job);
        } else {
            throw new Error("Job not found");
        }
    } catch (error) {
        logger.error("Error updating job status: " + error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get jobs

const tradespersonGetAllServiceJobs = async (req, res) => {
    try {
        const service = req.params.service;
        if (service) {
            const jobs = await jobDatabaseService.getAllServiceJobs(service);
            res.status(201).json(jobs);
        } else {
            throw new Error("Service not found");
        }
    } catch (error) {
        logger.error("Error getting jobs: " + error.message);
        res.status(500).json({ error: error.message });
    }
}

const tradespersonJobController = {
    tradespersonAcceptJob,
    tradespersonGetAllServiceJobs,
    tradespersonUpdateJobStatus,
};

export default tradespersonJobController;