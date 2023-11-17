// This is the validation logic for the booking service
import { logger } from '../../../config/index.js';

// Homeowner data validation function
const validate = (bookingData) => {
  const errors = [];

  // Required
  const requiredFields = ['userId', 'serviceId', 'dateTime', 'duration', 'status', 'paymentInfo'];
  requiredFields.forEach((field) => {
    if (!homeownerData[field]) {
      errors.push(`${field} is required`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
};

// This is a helper function for validating the booking model.
const validateBooking = (bookingData) => {
  const validateBooking = validate({
    bookingData,
  });

  if (!validateBooking.isValid) {
    logger.error(
      `Validation failed User: ${validateBooking.errors.join(', ')}`
    );
    throw new Error(
      `Validation failed User: ${validateBooking.errors.join(', ')}`
    );
  }
};

export default validateBooking;
