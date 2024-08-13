const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index'); // Adjust the path to your app entry point
const coachProfileModel = require('../../models/CoachProfileModel/CoachProfileModel');

describe('coachProfileController', () => {
    let createdDocuments = [];

    afterEach(async () => {
        // Delete only the newly created documents
        await coachProfileModel.deleteMany({
            _id: { $in: createdDocuments }
        });
        createdDocuments = [];
    }, 20000);


    test('should upload coach details successfully', async () => {
        const res = await request(app)
            .post('/api/v1/profile/coach-profile')
            .send({
                coachId: 'newCoachId',
                coachName: 'John Doe',
                coachEmail: 'johndoe@example.com',
                coachDateOfBirth: '1980-01-01',
                coachAge: 44
            })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Details uploaded successfully');
        expect(res.body.response).toHaveProperty('coachId', 'newCoachId');
        expect(res.body.response).toHaveProperty('coachName', 'John Doe');
        expect(res.body.response).toHaveProperty('coachEmail', 'johndoe@example.com');
        expect(res.body.response).toHaveProperty('coachDateOfBirth', '1980-01-01');
        expect(res.body.response).toHaveProperty('coachAge', 44);

        // Store the created document ID for cleanup
        createdDocuments.push(res.body.response._id);
    }, 20000);

    test('should handle errors when uploading coach details', async () => {
        const res = await request(app)
            .post('/api/v1/profile/coach-profile')
            .send({
                coachId: 'errorCoachId', // Assuming this triggers an error
                coachName: null, // Invalid data to trigger error
                coachEmail: 'invalidEmail',
                coachDateOfBirth: 'invalidDate',
                coachAge: 'invalidAge'
            })
            .expect(400);

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Details uploaded Unsuccessfully');
        expect(res.body).toHaveProperty('error');
    }, 20000);
});
