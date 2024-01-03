// This is the validator for creating/updating a job
import { logger } from "../../../config/index.js";
import validator from "validator";
import { userDatabaseService } from "../../../services/database/index.js";

// TODO: Add validation for the job description

const jobValidator = (jobData) => {
    const errors = [];
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    const currentDateObject = new Date(formattedDate);

    const jobCreationDateObject = new Date(jobData.jobCreationDate);
    let jobStartDateObject = null;
    let jobEndDateObject = null;

    if (jobData.jobStartDate) {
        jobStartDateObject = jobData.jobStartDate ? new Date(jobData.jobStartDate) : null;
    }
    if (jobData.jobEndDate) {
        jobEndDateObject = jobData.jobEndDate ? new Date(jobData.jobEndDate) : null;
    }

    // Handle non-dates
    if (isNaN(jobCreationDateObject)) {
        errors.push("Job creation date must be a valid date.");
    }
    if (isNaN(jobStartDateObject)) {
        errors.push("Job start date must be a valid date.");
    }
    if (isNaN(jobEndDateObject)) {
        errors.push("Job end date must be a valid date.");
    }
    const requiredFields = ["jobTitle", "jobDescription", "jobLocation", "jobCreationDate", "jobQuote", "jobServiceRequired", "jobStatus", "jobUrgency", "jobHomeowner"];
    requiredFields.forEach(field => {
        if (!jobData[field]) {
            errors.push(`${field} is required`);
        }
    });

    // Job Title 
    if (jobData.jobTitle && !validator.isLength(jobData.jobTitle, { min: 5, max: 50 })) {
        errors.push("Job title must be between 5 and 50 characters");
    }

    // Job Description 
    if (jobData.jobDescription && !validator.isLength(jobData.jobDescription, { min: 10, max: 500 })) {
        errors.push("Job description must be between 10 and 500 characters");
    }

    // Job Location
    if (jobData.jobLocation && !validator.isLength(jobData.jobLocation, { min: 5, max: 50 })) {
        errors.push("Job location must be between 5 and 50 characters");
    }

    // Job Quote
    if (jobData.jobQuote && !validator.isNumeric(jobData.jobQuote.toString()) && jobData.jobQuote <= 0) {
        errors.push("Job quote must be a valid positive number");
    }

    // Job Creation Date
    if (jobCreationDateObject < currentDateObject) {
        errors.push("Job Creation Date must not be in the past.");
    }

    // Job Service Required
    const validServices = ["plumbing", "welder", "photographer", "electrical", "carpentry", "landscaping", "painting", "cleaning", "other"];
    if (jobData.jobServiceRequired && !validServices.includes(jobData.jobServiceRequired)) {
        errors.push("Invalid service specified");
    }

    // Job Status
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (jobData.jobStatus && !validStatuses.includes(jobData.jobStatus)) {
        errors.push("Invalid status specified");
    }

    // Job Start date (Optional)
    if (jobStartDateObject && !isNaN(jobStartDateObject) && jobStartDateObject < currentDateObject) {
        errors.push("Job start date must be in the future");
    }

    // Job End date (Optional)
    if (jobEndDateObject && !isNaN(jobEndDateObject) && jobEndDateObject < currentDateObject) {
        errors.push("Job end date must be in the future");
    }

    // Job Urgency
    const validUrgencies = ["urgent", "semi-urgent", "not urgent"];
    if (jobData.jobUrgency && !validUrgencies.includes(jobData.jobUrgency)) {
        errors.push("Invalid urgency specified");
    }

    // Job homeowner 
    if (jobData.jobHomeowner && !userDatabaseService.getUserById(jobData.jobHomeowner)) {
        errors.push("Invalid homeowner specified");
    }

    // Job tradesman
    if (jobData.jobTradesperson && !userDatabaseService.getUserById(jobData.jobTradesperson)) {
        errors.push("Invalid tradesperson specified");
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};

// This is the helper function to validate the job model

const validateJob = (jobTitle, jobDescription, jobLocation, jobCreationDate, jobQuote, jobServiceRequired, jobStatus, jobUrgency, jobHomeowner) => {
    const validationJob = jobValidator({
        jobTitle,
        jobDescription,
        jobLocation,
        jobCreationDate,
        jobQuote,
        jobServiceRequired,
        jobStatus,
        jobUrgency,
        jobHomeowner,
    });

    if (!validationJob.isValid) {
        logger.error(`Validation failed Job: ${validationJob.errors.join(", ")}`);
        throw new Error(`Validation failed Job: ${validationJob.errors.join(", ")}`)

    }
};

export default validateJob;