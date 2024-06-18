const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index'); // Adjust the path to your app entry point
const eventOrganizerProfileModel = require('../../models/EventOrganizerProfileModel/EventOrganizerProfileModel');

describe('eventOrganizerProfileController', () => {
    let createdDocuments = [];

    afterEach(async () => {
        // Delete only the newly created documents
        await eventOrganizerProfileModel.deleteMany({
            _id: { $in: createdDocuments }
        });
        createdDocuments = [];
    });


    test('should upload eventOrganizer details successfully', async () => {
        const res = await request(app)
            .post('/api/v1/profile/eventOrganizer-profile')
            .send({
                eventOrganizerId: 'neweventOrganizerId',
                eventOrganizerName: 'John Doe',
                eventOrganizerEmail: 'johndoe@example.com',
                eventOrganizerDateOfBirth: '1980-01-01',
                eventOrganizerAge: 44
            })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Details uploaded successfully');
        expect(res.body.response).toHaveProperty('eventOrganizerId', 'neweventOrganizerId');
        expect(res.body.response).toHaveProperty('eventOrganizerName', 'John Doe');
        expect(res.body.response).toHaveProperty('eventOrganizerEmail', 'johndoe@example.com');
        expect(res.body.response).toHaveProperty('eventOrganizerDateOfBirth', '1980-01-01');
        expect(res.body.response).toHaveProperty('eventOrganizerAge', 44);

        // Store the created document ID for cleanup
        createdDocuments.push(res.body.response._id);
    });

    test('should handle errors when uploading eventOrganizer details', async () => {
        const res = await request(app)
            .post('/api/v1/profile/eventOrganizer-profile')
            .send({
                eventOrganizerId: 'erroreventOrganizerId', // Assuming this triggers an error
                eventOrganizerName: null, // Invalid data to trigger error
                eventOrganizerEmail: 'invalidEmail',
                eventOrganizerDateOfBirth: 'invalidDate',
                eventOrganizerAge: 'invalidAge'
            })
            .expect(400);

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Details uploaded Unsuccessfully');
        expect(res.body).toHaveProperty('error');
    });
});
