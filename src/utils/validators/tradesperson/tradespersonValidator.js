// This is the validator for the tradesperson model

const validateTradesperson = (tradespersonData) => {
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

export default validateTradesperson;