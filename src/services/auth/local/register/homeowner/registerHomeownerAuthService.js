// These are the services for the homeowner authentication
import { HomeownerModel } from '../../../../models';
import { validateHomeowner } from '../../../../utils/validators';

// Creates a new homeowner
const registerHomeowner = async (userId, data) => {
    const { propertyDetails } = data;
    const validation = validateHomeowner({ userId, propertyDetails });
    if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    const formattedPropertyDetails = propertyDetails.map(property => ({
        type: property.type,
        size: property.size,
        location: property.location,
        isBusiness: property.isBusiness
    }));
    const homeownerRecord = await HomeownerModel.createHomeowner({
        userId,
        propertyDetails: formattedPropertyDetails
    });
    return homeownerRecord;
};

export default registerHomeowner;