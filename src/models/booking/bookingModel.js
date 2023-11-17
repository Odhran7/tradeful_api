// This is the booking model for the booking service

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Service'
    },
    dateTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    specialRequests: String,
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;