// This is the validaror for the homeowner model
import { error } from 'winston';
import { logger } from '../../../config/index.js';

// Homeowner data validation function
const validate = (homeownerData) => {
  const errors = [];

  // Required
  const requiredFields = ['userId', 'propertyDetails'];
  requiredFields.forEach((field) => {
    if (!homeownerData[field]) {
      errors.push(`${field} is required`);
    }
  });

  // PropertyDetails
  const requiredFieldsPropertyDetails = [
    'type',
    'size',
    'location',
    'isBusiness',
  ];
  requiredFieldsPropertyDetails.forEach((field) => {
    if (!homeownerData.propertyDetails[field]) {
        if (field === 'isBusiness' && typeof homeownerData.propertyDetails['isBusiness'] !== 'boolean') {
           errors.push(`isBusiness should be a boolean value`)
        }
        if (homeownerData.propertyDetails[field] === null || homeownerData.propertyDetails[field] === undefined) {
            errors.push(`${field} is required`);
        }
    }
  });
  return {
    isValid: errors.length === 0,
    errors: errors,
  };
};

// This is a helper function for validating the homeowner model.
const validateHomeowner = (userId, propertyDetails) => {
  const validateHomeowner = validate({
    userId,
    propertyDetails,
  });

  if (!validateHomeowner.isValid) {
    logger.error(
      `Validation failed User: ${validateHomeowner.errors.join(', ')}`
    );
    throw new Error(
      `Validation failed User: ${validateHomeowner.errors.join(', ')}`
    );
  }
};

export default validateHomeowner;
