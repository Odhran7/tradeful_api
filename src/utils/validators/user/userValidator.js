import validator from 'validator';
import { logger } from '../../../config/index.js';

const validate = (userData) => {
    const errors = [];

    // Required
    const requiredFields = ['firstName', 'lastName', 'phoneNumber', 'address', 'email', 'password', 'role'];
    requiredFields.forEach(field => {
        if (!userData[field]) {
            errors.push(`${field} is required`);
        }
    });

    // Email
    if (userData.email && !validator.isEmail(userData.email)) {
        errors.push('Invalid email format');
    }

    // Password
    if (userData.password) {
        if (!validator.isStrongPassword(userData.password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
        })) {
            errors.push('Password does not meet strength requirements (min. 8 characters, including a mix of upper and lower case letters, numbers, and symbols)');
        }
    }

    // Phone number
    if (userData.phoneNumber && !validator.isMobilePhone(userData.phoneNumber, 'any', { strictMode: false })) {
        errors.push('Invalid phone number');
    }

    // Role
    const validRoles = ['homeowner', 'tradesperson', 'admin'];
    if (userData.role && !validRoles.includes(userData.role)) {
        errors.push('Invalid role specified');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};

// This is a helper function for validating the homeowner model.
const validateUser = (firstName, lastName, phoneNumber, address, email, password, role) => {
    const validationUser = validate({
        firstName,
        lastName,
        phoneNumber,
        address,
        email,
        password,
        role,
    });

    if (!validationUser.isValid) {
        logger.error(
            `Validation failed User: ${validationUser.errors.join(", ")}`
        );
        throw new Error(
            `Validation failed User: ${validationUser.errors.join(", ")}`
        );
    }
}

export default validateUser;