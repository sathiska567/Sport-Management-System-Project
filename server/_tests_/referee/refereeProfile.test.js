const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index'); // Adjust the path to your app entry point
const RefreeProfileModel = require('../../models/RefreeProfileDetailsModel/RefreeProfileDetailsModel');

describe('RefreeProfileController', () => {
    let createdDocuments = [];

    afterEach(async () => {
        // Delete only the newly created documents
        await RefreeProfileModel.deleteMany({
            _id: { $in: createdDocuments }
        });
        createdDocuments = [];
    }, 20000);


    test('should upload Refree details successfully', async () => {
        const res = await request(app)
            .post('/api/v1/refreeProfile/Refree-profile')
            .send({
                RefreeId: 'newRefreeId',
                RefreeName: 'John Doe',
                RefreeEmail: 'johndoe@example.com',
                RefreeDateOfBirth: '1980-01-01',
                RefreeAge: 44
            })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Details uploaded successfully');
        expect(res.body.response).toHaveProperty('RefreeId', 'newRefreeId');
        expect(res.body.response).toHaveProperty('RefreeName', 'John Doe');
        expect(res.body.response).toHaveProperty('RefreeEmail', 'johndoe@example.com');
        expect(res.body.response).toHaveProperty('RefreeDateOfBirth', '1980-01-01');
        expect(res.body.response).toHaveProperty('RefreeAge', 44);

        // Store the created document ID for cleanup
        createdDocuments.push(res.body.response._id);
    }, 20000);

    test('should handle errors when uploading Refree details', async () => {
        const res = await request(app)
            .post('/api/v1/refreeProfile/Refree-profile')
            .send({
                RefreeId: 'errorRefreeId', // Assuming this triggers an error
                RefreeName: null, // Invalid data to trigger error
                RefreeEmail: 'invalidEmail',
                RefreeDateOfBirth: 'invalidDate',
                RefreeAge: 'invalidAge'
            })
            .expect(400);

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Details uploaded Unsuccessfully');
        expect(res.body).toHaveProperty('error');
    }, 20000);
});
