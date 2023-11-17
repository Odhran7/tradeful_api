// This is the model for the review

import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // This could reference a Booking, Service, Product, etc.
        ref: 'Subject'
    },
    rating: {
        type: Number,
        required: true,
        min: 1, // Minimum rating
        max: 5  // Maximum rating
    },
    reviewText: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
