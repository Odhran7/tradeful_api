// These are tests for the login service
import { userDatabaseService } from '../../../../services/database/index';
import dotenv from "../../../../config/envConfig.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { loginUserEmail, loginUserPhoneNumber } from "../../../../services/auth/local/login/userLoginService";

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

// Login a homeowner user by email
describe("Login a homeowner user", () => {
    it("should login a homeowner by email", async () => {
        const userData = {
            firstName: 'Michaeldd',
            lastName: 'Doedd',
            phoneNumber: '1111111111',
            address: '123 Main Street',
            email: 'testuser2@example.com',
            password: 'TestPassword123!',
            role: 'homeowner',
            propertyDetails: {
                type: 'house',
                size: 'small',
                location: 'Dublin 1',
                isBusiness: false,
            },
        };
        const obj = await userDatabaseService.createHomeownerUser(userData);
        const createdUser = obj.user;

        const { user, token } = await loginUserEmail('testuser2@example.com', 'TestPassword123!');
        expect(user.email).toEqual('testuser2@example.com');
        expect(token).toBeDefined();
        // Delete the user
        await userDatabaseService.deleteUserById(createdUser._id);
    },
        it("should login a homeowner by phone number", async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '1234567890',
                address: '123 Main Street',
                email: 'testuser@example.com',
                password: 'TestPassword123!',
                role: 'homeowner',
                propertyDetails: {
                    type: 'house',
                    size: 'small',
                    location: 'Dublin 1',
                    isBusiness: false,
                },
            };
            const obj = await userDatabaseService.createHomeownerUser(userData);
            const createdUser = obj.user;
            const { user, token } = await loginUserPhoneNumber('1234567890', 'TestPassword123!');
            expect(user.phoneNumber).toEqual('1234567890');
            expect(token).toBeDefined();
            // Delete the user
            await userDatabaseService.deleteUserById(createdUser._id);
        }));
    it('should fail to log in a homeowner with incorrect password', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '1234567890',
            address: '123 Main Street',
            email: 'wrongpass@example.com',
            password: 'RightPassword123!',
            role: 'homeowner',
            propertyDetails: {
                type: 'house',
                size: 'small',
                location: 'Dublin 1',
                isBusiness: false,
            },
        };
        const obj = await userDatabaseService.createHomeownerUser(userData);
        const createdUser = obj.user;
        await expect(loginUserEmail('wrongpass@example.com', 'WrongPassword123!'))
            .rejects
            .toThrow('Incorrect password');
        await userDatabaseService.deleteUserById(createdUser._id);
    });
});

// Login a tradesperson user by email
describe("Login a tradesperson user", () => {
    it("should login a tradesperson by email", async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '1234567890',
            address: '123 Main Street',
            email: 'testuser@example.com',
            password: 'TestPassword123!',
            role: 'tradesperson',
            tradeType: 'plumber',
            businessName: 'John Doe Plumbing',
            skills: ['plumbing', 'electrical'],
            qualifications: ['plumbing', 'electrical'],
        };
        const obj = await userDatabaseService.createTradespersonUser(userData);
        const createdUser = obj.user;
        const { user, token } = await loginUserEmail('testuser@example.com', 'TestPassword123!');
        expect(user.email).toEqual('testuser@example.com');
        expect(token).toBeDefined();
        // Delete the user
        await userDatabaseService.deleteUserById(createdUser._id);
    },
        it("should login a tradesperson by phone number", async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '1234567890',
                address: '123 Main Street',
                email: 'testuser@example.com',
                password: 'TestPassword123!',
                role: 'tradesperson',
                tradeType: 'plumber',
                businessName: 'John Doe Plumbing',
                skills: ['plumbing', 'electrical'],
                qualifications: ['plumbing', 'electrical'],
            };
            const obj = await userDatabaseService.createTradespersonUser(userData);
            const createdUser = obj.user;
            const { user, token } = await loginUserPhoneNumber('1234567890', 'TestPassword123!');
            expect(user.phoneNumber).toEqual('1234567890');
            expect(token).toBeDefined();
            // Delete the user
            await userDatabaseService.deleteUserById(createdUser._id);
        }));
    it('should fail to log in a tradesperson with incorrect password', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '1234567890',
            address: '123 Main Street',
            email: 'wrongpass@example.com',
            password: 'TestPassword123!',
            role: 'tradesperson',
            tradeType: 'plumber',
            businessName: 'John Doe Plumbing',
            skills: ['plumbing', 'electrical'],
            qualifications: ['plumbing', 'electrical'],
        };
        const obj = await userDatabaseService.createTradespersonUser(userData);
        const createdUser = obj.user;
        await expect(loginUserEmail('wrongpass@example.com', 'WrongPassword123!'))
            .rejects
            .toThrow('Incorrect password');
        await userDatabaseService.deleteUserById(createdUser._id);
    });
});