// This is the validator for the tradesperson model
import { logger } from "../../../config/index.js";

const validate = (tradespersonData) => {
    const errors = [];
    // Required
    const requiredFields = ['userId', 'tradeType', 'businessName', 'skills', 'qualifications'];
    requiredFields.forEach(field => {
        if (!tradespersonData[field]) {
            errors.push(`${field} is required`);
        }
    });

    // TradeType
    if (tradespersonData.tradeType && typeof tradespersonData.tradeType !== 'string') {
        errors.push('Trade type must be a string');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};

const validateTradesperson = (userId, tradeType, businessName, skills, qualifications) => {
    const validationTradesperson = validate({
        userId,
        tradeType,
        businessName,
        skills,
        qualifications,
    });

    if (!validationTradesperson.isValid) {
        logger.error(
            `Validation failed Tradesperson: ${validationTradesperson.errors.join(", ")}`
        );
        throw new Error(
            `Validation failed Tradesperson: ${validationTradesperson.errors.join(", ")}`
        );
    }
}

export default validateTradesperson;