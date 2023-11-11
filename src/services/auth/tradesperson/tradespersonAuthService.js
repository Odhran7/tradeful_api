// These are the services for the tradesperson authentication

import TradespersonModel from '../../../models/TradespersonModel';
import { validateTradesperson } from '../../../utils/validators';

// Creates a new tradesperson
const registerTradesperson = async (userId, data) => {
    const { tradeType, businessName, skills, qualifications } = data;
    const validation = validateTradesperson({ userId, tradeType, businessName, skills, qualifications });
    if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    const tradespersonRecord = await TradespersonModel.createTradesperson({
        userId,
        tradeType,
        businessName,
        skills,
        qualifications
    });
    return tradespersonRecord;
};

export default registerTradesperson;