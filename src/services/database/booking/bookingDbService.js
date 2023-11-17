// This is the booking db service
import { BookingModel } from '../../../models/index.js';
import { logger } from '../../../config/index.js';
import { validateBooking } from '../../../utils/validators/index.js';
import Booking from '../../../models/booking/bookingModel.js';

// Create a booking
const createBooking = async (bookingData) => {
    try {
        const { 
            userId,
            serviceId,
            dateTime,
            duration,
            status,
            paymentInfo,
        } = bookingData;
        // Check for duplicate booking
        const isDuplicate = await preventDuplicateBooking(userId, serviceId, dateTime);
        if (!isDuplicate) {
            validateBooking(bookingData);
            const booking = new BookingModel({
                userId,
                serviceId,
                dateTime,
                duration,
                status,
                paymentInfo,
            });
            await booking.save();
            return booking;
        }

    } catch (error) {
        logger.error('Error creating booking: ' + error.message);
        throw error;
    }
}

// This function is used to get a booking by user id
const getBookingByUserId = async (userId) => {
    try {
        const booking = await BookingModel.find({ userId: userId });
        return booking;
    } catch (error) {
        logger.error('Error getting booking by user id: ' + error.message);
        throw error;
    }
}

// This function is used to get a booking by service id 
const getBookingByServiceId = async (serviceId) => {
    try {
        const booking = await BookingModel.find({ serviceId: serviceId });
        return booking;
    } catch (error) {
        logger.error('Error getting booking by service id: ' + error.message);
        throw error;
    }
}

// This function is used to update a booking user
const updateBookingUser = async (userId, data) => {
    try {
        const booking = await BookingModel.findOneAndUpdate({ userId: userId }, { data });
        return booking;
    } catch (error) {
        logger.error('Error updating booking User: ' + error.message);
        throw error;
    }
}

// This function is used to update a booking service
const updateBookingService = async (serviceId, data) => {
    try {
        const booking = await BookingModel.findOneAndUpdate({ serviceId: serviceId }, { data });
        return booking;
    } catch (error) {
        logger.error('Error updating booking Tradesman: ' + error.message);
        throw error;
    }
}

// This function is used to delete a booking
const deleteBookingByIdUser= async (userId) => {
    try {
        const booking = await getBookingByUserId(userId);
        if (booking) {
            await BookingModel.deleteOne({ userId: userId });
        } 
        return booking;
    } catch (error) {
        logger.error('Error deleting booking User: ' + error.message);
        throw error;
    }
}

const deleteBookingByIdService = async (serviceId) => {
    try {
        const booking = await getBookingByServiceId(serviceId);
        if (booking) {
            await BookingModel.deleteOne({ serviceId: serviceId });
        } 
        return booking;
    } catch (error) {
        logger.error('Error deleting booking Tradesman: ' + error.message);
        throw error;
    }
}

// This function is used to prevent duplicate bookings
const preventDuplicateBooking = async (userId, serviceId, dateTime) => {
    try {
        const isUserId = await BookingModel.find({ userId: userId });
        const isServiceId = await BookingModel.find({ serviceId: serviceId });
        const isDateTime = await BookingModel.find({ dateTime: dateTime });

        if (isUserId && isServiceId && isDateTime) {
            throw new Error('Booking already exists');
        }
        return false;
    } catch (error) {
        logger.error('Error preventing duplicate booking: ' + error.message);
        throw error;
    }
}

const bookingDatabaseService = {
    createBooking,
    getBookingByServiceId,
    getBookingByUserId,
    updateBookingUser,
    updateBookingService,
    deleteBookingByIdUser,
    deleteBookingByIdService,
};

export default bookingDatabaseService;