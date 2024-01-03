// This is the model for the jobs database

import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    jobCreationDate: {
        type: Date,
        required: true
    },
    jobQuote: {
        type: Number,
        required: true
    },
    jobServiceRequired: {
        type: String,
        required: true
    },
    jobStatus: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    jobStartDate: {
        type: Date,
    },
    jobEndDate: {
        type: Date,
    },
    jobUrgency: {
        type: String,
        required: true,
        enum: ['urgent', 'semi-urgent', 'not urgent'],
        default: 'semi-urgent'
    },
    jobPaymentInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    jobHomeowner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    jobTradesperson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}
);

const JobModel = mongoose.model("Job", jobSchema);
export default JobModel;