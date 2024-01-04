// This is the controller for the jobs database (homeowner)

import { logger } from "../../../config/index.js";
import { jobDatabaseService } from "../../../services/database/index.js";
import envConfig from "../../../config/envConfig.js";


// Controller for homeowner creating a job

const homeownerCreateJob = async (req, res) => {
    try {
        const userId = req.params.userId;
        const jobDetails = req.body;
        if (!userId) {
            throw new Error("User not found");
        };
        if (!jobDetails) {
            throw new Error("Job details not found");
        };
        if (userId && jobDetails) {
            const job = await jobDatabaseService.createJobHomeowner(userId, jobDetails);
            if (!job) {
                throw new Error("Job not found");
            }
            res.status(201).json(job);
        } else {
            throw new Error("User not found");
        }

    } catch (error) {
        logger.error("Error creating job: " + error.message);
        res.status(500).json({ error: error.message });
    }
};

// Controller for homeowner updating jobs

// Title
const homeownerUpdateJobTitle = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const jobTitle = req.body.jobTitle;
        if (!jobId) {
            throw new Error("Job not found");
        }
        if (!jobTitle) {
            throw new Error("Job title not found");
        }
        if (jobId && jobTitle) {
            const job = await jobDatabaseService.updateJobTitleById(jobId, jobTitle);
            if (!job) {
                throw new Error("Job not found");
            }
            res.status(201).json(job);
        } else {
            throw new Error("Job not found");
        }
    } catch (error) {
        logger.error("Error updating job title: " + error.message);
        res.status(500).json({ error: error.message });
    }
};

// Description
const homeownerUpdateJobDescription = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const jobDescription = req.body.jobDescription;
        if (!jobId) {
            throw new Error("Job not found");
        }
        if (!jobDescription) {
            throw new Error("Job description not found");
        }
        if (jobId && jobDescription) {
            const job = await jobDatabaseService.updateJobDescriptionById(jobId, jobDescription);
            if (!job) {
                throw new Error("Job not found");
            }
            res.status(201).json(job);
        } else {
            throw new Error("Job not found");
        }
    } catch (error) {
        logger.error("Error updating job description: " + error.message);
        res.status(500).json({ error: error.message });
    }
};

// Quote
const homeownerUpdateJobQuote = async (req, res) => {
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

// Urgency
const homeownerUpdateJobUrgency = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const jobUrgency = req.body.jobUrgency;
        if (!jobId) {
            throw new Error("Job not found");
        }
        if (!jobUrgency) {
            throw new Error("Job urgency not found");
        }
        if (jobId && jobUrgency) {
            const job = await jobDatabaseService.updateJobUrgencyById(jobId, jobUrgency);
            if (!job) {
                throw new Error("Job not found");
            }
            res.status(201).json(job);
        } else {
            throw new Error("Job not found");
        }
    } catch (error) {
        logger.error("Error updating job urgency: " + error.message);
        res.status(500).json({ error: error.message });
    }
};

// Update job
const homeownerUpdateJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const jobDetails = req.body;
        if (!jobId) {
            throw new Error("Job not found");
        }
        if (!jobDetails) {
            throw new Error("Job details not found");
        }
        if (jobId && jobDetails) {
            const job = await jobDatabaseService.updateJobById(jobId, jobDetails);
            if (!job) {
                throw new Error("Job not found");
            }
            res.status(201).json(job);
        } else {
            throw new Error("Job not found");
        }
    } catch (error) {
        logger.error("Error updating job: " + error.message);
        res.status(500).json({ error: error.message });
    }
}

// Seeing list of jobs
const homeownerGetAllJobs = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            throw new Error("User not found");
        }
        if (userId) {
            const jobs = await jobDatabaseService.findJobHomeownerByHomeownerId(userId);
            if (!jobs) {
                throw new Error("Jobs not found");
            }
            res.status(201).json(jobs);
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        logger.error("Error getting jobs: " + error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get a job by id
const homeownerGetJobById = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        if (!jobId) {
            throw new Error("Job not found");
        }
        if (jobId) {
            const job = await jobDatabaseService.findJobHomeownerById(jobId);
            if (!job) {
                throw new Error("Job not found")
            }
            res.status(201).json(job);
        } else {
            throw new Error("Job not found");
        }
    } catch (error) {
        logger.error("Error getting job: " + error.message);
        res.status(500).json({ error: error.message });
    }
};

// Delete a job

const homeownerDeleteJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        if (!jobId) {
            throw new Error("Job not found");
        }
        if (jobId) {
            const returnedId = await jobDatabaseService.deleteJobById(jobId);
            res.status(201).json({ message: "Job deleted successfully" });
        } else {
            throw new Error("Job not found");
        }
    } catch (error) {
        logger.error("Error deleting job: " + error.message);
        res.status(500).json({ error: error.message });
    }
};

const homeownerJobController = {
    homeownerCreateJob,
    homeownerUpdateJobTitle,
    homeownerUpdateJobDescription,
    homeownerUpdateJobQuote,
    homeownerUpdateJobUrgency,
    homeownerUpdateJob,
    homeownerGetAllJobs,
    homeownerDeleteJob,
    homeownerGetJobById,
};

export default homeownerJobController;