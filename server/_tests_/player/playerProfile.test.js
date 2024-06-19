const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index'); // Adjust the path to your app entry point
const playerProfileModel = require('../../models/PlayerProfileModel/PlayerProfileModel');

describe('playerProfileController', () => {
    let createdDocuments = [];

    afterEach(async () => {
        // Delete only the newly created documents
        await playerProfileModel.deleteMany({
            _id: { $in: createdDocuments }
        });
        createdDocuments = [];
    }, 20000);


    test('should upload player details successfully', async () => {
        const res = await request(app)
            .post('/api/v1/profile/player-profile')
            .send({
                playerId: 'newplayerId',
                playerName: 'John Doe',
                playerEmail: 'johndoe@example.com',
                playerDateOfBirth: '1980-01-01',
                playerAge: 44
            })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Details uploaded successfully');
        expect(res.body.response).toHaveProperty('playerId', 'newplayerId');
        expect(res.body.response).toHaveProperty('playerName', 'John Doe');
        expect(res.body.response).toHaveProperty('playerEmail', 'johndoe@example.com');
        expect(res.body.response).toHaveProperty('playerDateOfBirth', '1980-01-01');
        expect(res.body.response).toHaveProperty('playerAge', 44);

        // Store the created document ID for cleanup
        createdDocuments.push(res.body.response._id);
    }, 20000);

    test('should handle errors when uploading player details', async () => {
        const res = await request(app)
            .post('/api/v1/profile/player-profile')
            .send({
                playerId: 'errorplayerId', // Assuming this triggers an error
                playerName: null, // Invalid data to trigger error
                playerEmail: 'invalidEmail',
                playerDateOfBirth: 'invalidDate',
                playerAge: 'invalidAge'
            })
            .expect(400);

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Details uploaded Unsuccessfully');
        expect(res.body).toHaveProperty('error');
    }, 20000);
});
