import { jobDatabaseService } from "../../../../services/database/index.js";
import { userDatabaseService } from "../../../../services/database/index.js"
import dotenv from "../../../../config/envConfig.js";
import mongoose from 'mongoose';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

// Create Job test
describe('Create a Job', () => {
    it('should create a job', async () => {

        // First we have to create a homeowner user
        const userData = {
            firstName: 'James',
            lastName: 'Jeep',
            phoneNumber: '1232987890',
            address: '1 Malahide Street',
            email: 'russell.odn@gmail.com',
            password: 'Password123!',
            role: 'homeowner',
            propertyDetails: {
                type: 'house',
                size: 'small',
                location: 'Dublin 1',
                isBusiness: false,
            },
        };

        const obj = await userDatabaseService.createHomeownerUser(userData);
        const newHomeowner = obj.user;

        const fullDate = new Date();
        const currentDate = fullDate.toISOString().split('T')[0];

        const homeownerId = newHomeowner._id;
        const jobDetails = {
            jobTitle: 'Fix Leak',
            jobDescription: 'Leak in the kitchen sink',
            jobLocation: '123 Main Street',
            jobCreationDate: currentDate,
            jobQuote: 200,
            jobServiceRequired: 'plumbing',
            jobStatus: 'pending',
            jobUrgency: 'urgent',
        };

        const job = await jobDatabaseService.createJobHomeowner(homeownerId, jobDetails);

        expect(job._id).toBeDefined();
        expect(job.jobTitle).toBe(jobDetails.jobTitle);
        await jobDatabaseService.deleteJobById(job._id);
        await userDatabaseService.deleteUserById(homeownerId);
    });
});

// Find Job By ID test
describe('Find Job By ID', () => {
    it('should retrieve a job by ID', async () => {
        // First we have to create a homeowner user
        const userData = {
            firstName: 'James',
            lastName: 'Jeep',
            phoneNumber: '1232987890',
            address: '1 Malahide Street',
            email: 'russell.odn@gmail.com',
            password: 'Password123!',
            role: 'homeowner',
            propertyDetails: {
                type: 'house',
                size: 'small',
                location: 'Dublin 1',
                isBusiness: false,
            },
        };

        const obj = await userDatabaseService.createHomeownerUser(userData);
        const newUser = obj.user;
        const homeownerId = newUser._id;

        const fullDate = new Date();
        const currentDate = fullDate.toISOString().split('T')[0];

        const jobDetails = {
            jobTitle: 'Fix Leak',
            jobDescription: 'Leak in the kitchen sink',
            jobLocation: '123 Main Street',
            jobCreationDate: currentDate,
            jobQuote: 200,
            jobServiceRequired: 'plumbing',
            jobStatus: 'pending',
            jobUrgency: 'urgent',
        };

        const newJob = await jobDatabaseService.createJobHomeowner(homeownerId, jobDetails);
        const jobId = newJob._id;
        const job = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(job).toBeDefined();
        expect(job._id).toEqual(jobId);

        await jobDatabaseService.deleteJobById(jobId);
        await userDatabaseService.deleteUserById(homeownerId);
    });
});

// Update Job Title By ID test
describe('Update Job by various params', () => {
    it("should update a job's title", async () => {
        // First we have to create a homeowner user
        const userData = {
            firstName: 'James',
            lastName: 'Jeep',
            phoneNumber: '1232987890',
            address: '1 Malahide Street',
            email: 'russell.odn@gmail.com',
            password: 'Password123!',
            role: 'homeowner',
            propertyDetails: {
                type: 'house',
                size: 'small',
                location: 'Dublin 1',
                isBusiness: false,
            },
        };

        const obj = await userDatabaseService.createHomeownerUser(userData);
        const newUser = obj.user;
        const homeownerId = newUser._id;

        const fullDate = new Date();
        const currentDate = fullDate.toISOString().split('T')[0];

        const jobDetails = {
            jobTitle: 'Fix Leak',
            jobDescription: 'Leak in the kitchen sink',
            jobLocation: '123 Main Street',
            jobCreationDate: currentDate,
            jobQuote: 200,
            jobServiceRequired: 'plumbing',
            jobStatus: 'pending',
            jobUrgency: 'urgent',
        };

        const newJob = await jobDatabaseService.createJobHomeowner(homeownerId, jobDetails);
        const jobId = newJob._id;
        const job = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(job).toBeDefined();
        expect(job._id).toEqual(jobId);

        const newTitle = "Fix Leak in Bathroom Sink";

        await jobDatabaseService.updateJobTitleById(jobId, newTitle);
        const updatedJob = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(updatedJob).toBeDefined();
        expect(updatedJob.jobTitle).toBe(newTitle);

        await userDatabaseService.deleteUserById(homeownerId);
        await jobDatabaseService.deleteJobById(jobId);

    });

    it("should update a job's description", async () => {
        // First we have to create a homeowner user
        const userData = {
            firstName: 'James',
            lastName: 'Jeep',
            phoneNumber: '1232987890',
            address: '1 Malahide Street',
            email: 'russell.odn@gmail.com',
            password: 'Password123!',
            role: 'homeowner',
            propertyDetails: {
                type: 'house',
                size: 'small',
                location: 'Dublin 1',
                isBusiness: false,
            },
        };

        const obj = await userDatabaseService.createHomeownerUser(userData);
        const newUser = obj.user;
        const homeownerId = newUser._id;

        const fullDate = new Date();
        const currentDate = fullDate.toISOString().split('T')[0];

        const jobDetails = {
            jobTitle: 'Fix Leak',
            jobDescription: 'Leak in the kitchen sink',
            jobLocation: '123 Main Street',
            jobCreationDate: currentDate,
            jobQuote: 200,
            jobServiceRequired: 'plumbing',
            jobStatus: 'pending',
            jobUrgency: 'urgent',
        };

        const newJob = await jobDatabaseService.createJobHomeowner(homeownerId, jobDetails);
        const jobId = newJob._id;
        const job = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(job).toBeDefined();
        expect(job._id).toEqual(jobId);

        const newDescription = "Leak in the bathroom sink."

        await jobDatabaseService.updateJobDescriptionById(jobId, newDescription);
        const updatedJob = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(updatedJob).toBeDefined();
        expect(updatedJob.jobDescription).toBe(newDescription);

        await userDatabaseService.deleteUserById(homeownerId);
        await jobDatabaseService.deleteJobById(jobId);
    });

    it("should update a job's quote", async () => {
        // First we have to create a homeowner user
        const userData = {
            firstName: 'James',
            lastName: 'Jeep',
            phoneNumber: '1232987890',
            address: '1 Malahide Street',
            email: 'russell.odn@gmail.com',
            password: 'Password123!',
            role: 'homeowner',
            propertyDetails: {
                type: 'house',
                size: 'small',
                location: 'Dublin 1',
                isBusiness: false,
            },
        };

        const obj = await userDatabaseService.createHomeownerUser(userData);
        const newUser = obj.user;
        const homeownerId = newUser._id;

        const fullDate = new Date();
        const currentDate = fullDate.toISOString().split('T')[0];

        const jobDetails = {
            jobTitle: 'Fix Leak',
            jobDescription: 'Leak in the kitchen sink',
            jobLocation: '123 Main Street',
            jobCreationDate: currentDate,
            jobQuote: 200,
            jobServiceRequired: 'plumbing',
            jobStatus: 'pending',
            jobUrgency: 'urgent',
        };

        const newJob = await jobDatabaseService.createJobHomeowner(homeownerId, jobDetails);
        const jobId = newJob._id;
        const job = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(job).toBeDefined();
        expect(job._id).toEqual(jobId);

        const newQuote = 300;

        await jobDatabaseService.updateJobQuoteById(jobId, newQuote);
        const updatedJob = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(updatedJob).toBeDefined();
        expect(updatedJob.jobQuote).toBe(newQuote);

        await userDatabaseService.deleteUserById(homeownerId);
        await jobDatabaseService.deleteJobById(jobId);
    });

    it("should update a job's urgency", async () => {
        // First we have to create a homeowner user
        const userData = {
            firstName: 'James',
            lastName: 'Jeep',
            phoneNumber: '1232987890',
            address: '1 Malahide Street',
            email: 'russell.odn@gmail.com',
            password: 'Password123!',
            role: 'homeowner',
            propertyDetails: {
                type: 'house',
                size: 'small',
                location: 'Dublin 1',
                isBusiness: false,
            },
        };

        const obj = await userDatabaseService.createHomeownerUser(userData);
        const newUser = obj.user;
        const homeownerId = newUser._id;

        const fullDate = new Date();
        const currentDate = fullDate.toISOString().split('T')[0];

        const jobDetails = {
            jobTitle: 'Fix Leak',
            jobDescription: 'Leak in the kitchen sink',
            jobLocation: '123 Main Street',
            jobCreationDate: currentDate,
            jobQuote: 200,
            jobServiceRequired: 'plumbing',
            jobStatus: 'pending',
            jobUrgency: 'urgent',
        };

        const newJob = await jobDatabaseService.createJobHomeowner(homeownerId, jobDetails);
        const jobId = newJob._id;
        const job = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(job).toBeDefined();
        expect(job._id).toEqual(jobId);

        const newUrgency = 'semi-urgent';

        await jobDatabaseService.updateJobUrgencyById(jobId, newUrgency);
        const updatedJob = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(updatedJob).toBeDefined();
        expect(updatedJob.jobUrgency).toBe(newUrgency);

        await userDatabaseService.deleteUserById(homeownerId);
        await jobDatabaseService.deleteJobById(jobId);
    });
    it("should update a job's status", async () => {
        // First we have to create a homeowner user
        const userData = {
            firstName: 'James',
            lastName: 'Jeep',
            phoneNumber: '1232987890',
            address: '1 Malahide Street',
            email: 'russell.odn@gmail.com',
            password: 'Password123!',
            role: 'homeowner',
            propertyDetails: {
                type: 'house',
                size: 'small',
                location: 'Dublin 1',
                isBusiness: false,
            },
        };

        const obj = await userDatabaseService.createHomeownerUser(userData);
        const newUser = obj.user;
        const homeownerId = newUser._id;

        const fullDate = new Date();
        const currentDate = fullDate.toISOString().split('T')[0];

        const jobDetails = {
            jobTitle: 'Fix Leak',
            jobDescription: 'Leak in the kitchen sink',
            jobLocation: '123 Main Street',
            jobCreationDate: currentDate,
            jobQuote: 200,
            jobServiceRequired: 'plumbing',
            jobStatus: 'pending',
            jobUrgency: 'urgent',
        };

        const newJob = await jobDatabaseService.createJobHomeowner(homeownerId, jobDetails);
        const jobId = newJob._id;
        const job = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(job).toBeDefined();
        expect(job._id).toEqual(jobId);

        const newStatus = 'confirmed';

        await jobDatabaseService.updateJobStatusById(jobId, newStatus);
        const updatedJob = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(updatedJob).toBeDefined();
        expect(updatedJob.jobStatus).toBe(newStatus);

        await userDatabaseService.deleteUserById(homeownerId);
        await jobDatabaseService.deleteJobById(jobId);
    });

    it("should update a job to have a tradesperson", async () => {
        // First we have to create a homeowner user
        const userData = {
            firstName: 'James',
            lastName: 'Jeep',
            phoneNumber: '1232987890',
            address: '1 Malahide Street',
            email: 'russell.odn@gmail.com',
            password: 'Password123!',
            role: 'homeowner',
            propertyDetails: {
                type: 'house',
                size: 'small',
                location: 'Dublin 1',
                isBusiness: false,
            },
        };

        const obj = await userDatabaseService.createHomeownerUser(userData);
        const newUser = obj.user;
        const homeownerId = newUser._id;

        const fullDate = new Date();
        const currentDate = fullDate.toISOString().split('T')[0];

        const jobDetails = {
            jobTitle: 'Fix Leak',
            jobDescription: 'Leak in the kitchen sink',
            jobLocation: '123 Main Street',
            jobCreationDate: currentDate,
            jobQuote: 200,
            jobServiceRequired: 'plumbing',
            jobStatus: 'pending',
            jobUrgency: 'urgent',
        };

        // Now we have to create a new tradesperson

        const tradesmanData = {
            firstName: 'jjd',
            lastName: 'dfdf',
            phoneNumber: '1234997890',
            address: '123 Main Street',
            email: 'd.odhran@gmail.com',
            password: 'Password123!',
            role: 'tradesperson',
            tradeType: 'plumber',
            businessName: 'John Doe Plumbing',
            skills: ['plumbing', 'electrical'],
            qualifications: ['plumbing', 'electrical'],
        };
        const tradesmanObj = await userDatabaseService.createTradespersonUser(tradesmanData);

        const newTradesman = tradesmanObj.user;

        const newJob = await jobDatabaseService.createJobHomeowner(homeownerId, jobDetails);
        const jobId = newJob._id;
        const job = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(job).toBeDefined();
        expect(job._id).toEqual(jobId);

        await jobDatabaseService.updateJobTradespersonById(jobId, newTradesman);
        const updatedJob = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(updatedJob).toBeDefined();
        expect(updatedJob.jobTradesperson._id).toEqual(newTradesman._id);

        await userDatabaseService.deleteUserById(homeownerId);
        await jobDatabaseService.deleteJobById(jobId);
    });
});

// Delete Job By ID test
describe('Delete Job By ID', () => {
    it('should delete a job by ID', async () => {
        // First we have to create a homeowner user
        const userData = {
            firstName: 'James',
            lastName: 'Jeep',
            phoneNumber: '1232987890',
            address: '1 Malahide Street',
            email: 'russell.odn@gmail.com',
            password: 'Password123!',
            role: 'homeowner',
            propertyDetails: {
                type: 'house',
                size: 'small',
                location: 'Dublin 1',
                isBusiness: false,
            },
        };

        const obj = await userDatabaseService.createHomeownerUser(userData);
        const newUser = obj.user;
        const homeownerId = newUser._id;

        const fullDate = new Date();
        const currentDate = fullDate.toISOString().split('T')[0];

        const jobDetails = {
            jobTitle: 'Fix Leak',
            jobDescription: 'Leak in the kitchen sink',
            jobLocation: '123 Main Street',
            jobCreationDate: currentDate,
            jobQuote: 200,
            jobServiceRequired: 'plumbing',
            jobStatus: 'pending',
            jobUrgency: 'urgent',
        };

        const newJob = await jobDatabaseService.createJobHomeowner(homeownerId, jobDetails);
        const jobId = newJob._id;
        const job = await jobDatabaseService.findJobHomeownerById(jobId);

        expect(job).toBeDefined();
        expect(job._id).toEqual(jobId);

        const deletedJobId = await jobDatabaseService.deleteJobById(jobId);

        expect(deletedJobId).toEqual(jobId);

        await userDatabaseService.deleteUserById(homeownerId);
    });
});


