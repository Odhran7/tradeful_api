// This is the validator for the tradesperson model

const validate = (tradespersonData) => {
    const errors = [];

    // Required
    const requiredFields = ['userId', 'tradeType'];
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

const validateTradesperson = (userId, tradeType, businessName, skills, qulaifications) => {
    const validationTradesperson = validate({
        userId,
        tradeType,
        businessName,
        skills,
        qulaifications,
    });

    if (!validationTradesperson.isValid) {
        logger.error(
            `Validation failed User: ${validateTradesperson.errors.join(", ")}`
        );
        throw new Error(
            `Validation failed User: ${validateTradesperson.errors.join(", ")}`
        );
    }
}

export default validateTradesperson;