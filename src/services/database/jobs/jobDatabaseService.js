// This is the database service for the jobs database (homeowner)

import { logger } from "../../../config/index.js";
import { validateJob } from '../../../utils/validators/index.js';
import { JobModel } from "../../../models/index.js";
import { userDatabaseService } from '../index.js';
import mongoose from "mongoose";

// Helper function for creating a job
const createJobHomeowner = async (userId, jobDetails) => {
    try {
        const homeowner = await userDatabaseService.getUserById(userId);
        if (homeowner.role !== 'homeowner') {
            throw new Error("User is not a homeowner");
        };
        validateJob(...Object.values(jobDetails), homeowner);
        const job = new JobModel({ ...jobDetails, jobHomeowner: homeowner });
        await job.save();
        return job;
    } catch (error) {
        logger.error("Error creating job: " + error.message);
        throw error;
    }
}

// Getters

// Gets a job by id
const findJobHomeownerById = async (jobId) => {
    try {
        const job = await JobModel.findOne({ _id: jobId });
        return job;
    } catch (error) {
        logger.error("Error finding job by id: " + error.message);
        throw error;
    }
}

// Gets jobs by homneowner id
const findJobHomeownerByHomeownerId = async (userId) => {
    try {
        const jobs = await JobModel.find({ 'jobHomeowner': userId });
        return jobs;
    } catch (error) {
        logger.error("Error finding jobs by homeowner id: " + error.message);
        throw error;
    }
}


// Gets top x jobs that are pending
const getTopXJobs = async (x) => {
    try {
        const jobs = await JobModel.find({}).sort({ jobCreationDate: -1, jobStatus: 'pending' }).limit(x);
        return jobs;
    } catch (error) {
        logger.error("Error getting top x jobs: " + error.message);
        throw error;
    }
}

// Gets all jobs
const getAllPendingJobs = async () => {
    try {
        const jobs = await JobModel.find({}).sort({ jobCreationDate: -1, jobStatus: 'pending' })
        return jobs;
    } catch (error) {
        logger.error("Error getting all jobs: " + error.message);
        throw error;
    }
}

// Gets all jobs by service type
const getAllPendingJobsByServiceType = async (serviceType) => {
    try {
        const jobs = await JobModel.find({ jobServiceRequired: serviceType }).sort({ jobCreationDate: -1, jobStatus: 'pending' })
        return jobs;
    } catch (error) {
        logger.error("Error getting all jobs by service type: " + error.message);
        throw error;
    }
}

// Gets all jobs with status completed
const getAllCompletedJobs = async () => {
    try {
        const jobs = await JobModel.find({ jobStatus: 'completed' }).sort({ jobCreationDate: -1 })
        return jobs;
    } catch (error) {
        logger.error("Error getting all jobs with status completed: " + error.message);
        throw error;
    }
};

// Setters

// Updates job items by id

// Updates job title by id
const updateJobTitleById = async (jobId, jobTitle) => {
    try {
        const job = await findJobHomeownerById(jobId);
        const newJob = await JobModel.findByIdAndUpdate(jobId, {
            jobTitle,
        });
        return newJob;
    } catch (error) {
        logger.error("Error updating job title by id: " + error.message);
        throw error;
    }
}

// Updates job description by id

const updateJobDescriptionById = async (jobId, jobDescription) => {
    try {
        const job = await findJobHomeownerById(jobId);
        const newJob = await JobModel.findByIdAndUpdate(jobId, {
            jobDescription,
        });
        return newJob;
    } catch (error) {
        logger.error("Error updating job description by id: " + error.message);
        throw error;
    }
}

// Update job quote by id

const updateJobQuoteById = async (jobId, jobQuote) => {
    try {
        const job = await findJobHomeownerById(jobId);
        const newJob = await JobModel.findByIdAndUpdate(jobId, {
            jobQuote,
        }, { new: true });
        return newJob;
    } catch (error) {
        logger.error("Error updating job quote by id: " + error.message);
        throw error;
    }
}

// Update job status by id

const updateJobStatusById = async (jobId, jobStatus) => {
    try {
        const allowed_status = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!allowed_status.includes(jobStatus)) {
            throw new Error("Invalid status specified");
        }
        const job = await findJobHomeownerById(jobId);
        const newJob = await JobModel.findByIdAndUpdate(jobId, {
            jobStatus,
        }, { new: true });
        return newJob;
    } catch (error) {
        logger.error("Error updating job status by id: " + error.message);
        throw error;
    }
}

// Update job urgency by id

const updateJobUrgencyById = async (jobId, jobUrgency) => {
    try {
        const allowed_urgency = ['urgent', 'semi-urgent', 'not urgent'];
        if (!allowed_urgency.includes(jobUrgency)) {
            throw new Error("Invalid urgency specified");
        }
        const job = await findJobHomeownerById(jobId);
        const newJob = await JobModel.findByIdAndUpdate(jobId, {
            jobUrgency,
        });
        return newJob;
    } catch (error) {
        logger.error("Error updating job urgency by id: " + error.message);
        throw error;
    }
}

// Update job tradesperson by id

const updateJobTradespersonById = async (jobId, jobTradesperson) => {
    try {
        // Ensure the updated job is returned
        const tradesperson = await userDatabaseService.getUserById(jobTradesperson);
        if (tradesperson.role !== 'tradesperson') {
            throw new Error("User is not a tradesperson");
        }
        const updatedJob = await JobModel.findByIdAndUpdate(jobId, {
            jobTradesperson
        }, { new: true }); // Get the updated document
        return updatedJob;
    } catch (error) {
        logger.error("Error updating job tradesperson by id: " + error.message);
        throw error;
    }
}

// Update job

const updateJobById = async (jobId, jobDetails) => {
    try {
        const job = await findJobHomeownerById(jobId);
        const newJob = await JobModel.findByIdAndUpdate(jobId, {
            ...jobDetails
        }, { new: true });
        return job;
    } catch (error) {
        logger.error("Error updating job by id: " + error.message);
        throw error;
    }
}


// Delete job by id

const deleteJobById = async (jobId) => {
    try {
        const job = await findJobHomeownerById(jobId);
        if (!job) {
            throw new Error("Job not found");
        }
        await JobModel.findByIdAndDelete(jobId);
        return jobId;
    } catch (error) {
        logger.error("Error deleting job by id: " + error.message);
        throw error;
    }
}

const jobDatabaseService = {
    createJobHomeowner,
    findJobHomeownerById,
    findJobHomeownerByHomeownerId,
    getTopXJobs,
    getAllPendingJobs,
    getAllPendingJobsByServiceType,
    getAllCompletedJobs,
    updateJobTitleById,
    updateJobDescriptionById,
    updateJobQuoteById,
    updateJobStatusById,
    updateJobUrgencyById,
    updateJobTradespersonById,
    updateJobById,
    deleteJobById,
};

export default jobDatabaseService;
