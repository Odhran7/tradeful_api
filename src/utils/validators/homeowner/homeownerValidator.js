// This is the validaror for the homeowner model

// Homeowner data validation function
const validate = (homeownerData) => {
    const errors = [];

    // Required
    const requiredFields = ['userId', 'propertyDetails'];
    requiredFields.forEach(field => {
        if (!homeownerData[field]) {
            errors.push(`${field} is required`);
        }
    });

    // PropertyDetails
    if (propertyDetails && Array.isArray(propertyDetails)) {
        propertyDetails.forEach((property, index) => {
            if (!property.type) {
                errors.push(`Property type is required for property at index ${index}`);
            }
            if (!property.size) {
                errors.push(`Property size is required for property at index ${index}`);
            }
            if (!property.location) {
                errors.push(`Property location is required for property at index ${index}`);
            }
            // Checking for boolean value for isBusiness
            if (typeof property.isBusiness !== 'boolean') {
                errors.push(`Property 'isBusiness' should be a boolean value for property at index ${index}`);
            }
        });
    } else {
        errors.push('Property details should be an array');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};

// This is a helper function for validating the homeowner model.
const validateHomeowner = (userId, propertyDetails) => {
    const validateHomeowner = validate({
        userId,
        propertyDetails
    });

    if (!validateHomeowner.isValid) {
        logger.error(
            `Validation failed User: ${validateHomeowner.errors.join(", ")}`
        );
        throw new Error(
            `Validation failed User: ${validateHomeowner.errors.join(", ")}`
        );
    }
}

export default validateHomeowner;