// This is the controller for the jobs database (tradesperson)

import { logger } from "../../../config/index.js";
import { jobDatabaseService } from "../../../services/database/index.js";
import envConfig from "../../../config/envConfig.js";

// Accept a job

const tradespersonAcceptJob = async (req, res) => {
    try {
        const jobId = req.body.jobId;
        const tradespersonId = req.params.tradespersonId;
        if (!jobId) {
            throw new Error("Job not found");
        }

        if (!tradespersonId) {
            throw new Error("Tradesperson not found");
        }
        if (jobId && tradespersonId) {
            const job = await jobDatabaseService.updateJobTradespersonById(jobId, tradespersonId);
            if (!job) {
                throw new Error("Job not found");
            }
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
        if (!jobId) {
            throw new Error("Job not found");
        }

        if (!jobStatus) {
            throw new Error("Job status not found");
        }
        if (jobId && jobStatus) {
            const job = await jobDatabaseService.updateJobStatusById(jobId, jobStatus);
            if (!job) {
                throw new Error("Job not found");
            }
            res.status(201).json(job);
        } else {
            throw new Error("Job not found");
        }
    } catch (error) {
        logger.error("Error updating job status: " + error.message);
        res.status(500).json({ error: error.message });
    }
};

// Quote
const tradespersonUpdateJobQuote = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const jobQuote = req.body.jobQuote;
        if (!jobId) {
            throw new Error("Job not found");
        }
        if (!jobQuote) {
            throw new Error("Job quote not found");
        }
        if (jobId && jobQuote) {
            const job = await jobDatabaseService.updateJobQuoteById(jobId, jobQuote);
            if (!job) {
                throw new Error("Job not found");
            }
            res.status(201).json(job);
        } else {
            throw new Error("Job not found");
        }
    } catch (error) {
        logger.error("Error updating job quote: " + error.message);
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

const getJobsTradesperson = async (req, res) => {
    try {
        const tradespersonUserId = req.params.userId;
        if (tradespersonUserId) {
            const jobs = await jobDatabaseService.findJobHomeownerByHomeownerId(tradespersonUserId);
            res.status(201).json(jobs);
        } else {
            throw new Error("Tradesperson not found");
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
    getJobsTradesperson,
    tradespersonUpdateJobQuote,
};

export default tradespersonJobController;