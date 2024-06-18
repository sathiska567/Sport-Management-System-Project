const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index'); 
const playerSearchProfileModel = require('../../models/PlayerSearchProfileModel/PlayerSearchProfileModel');

describe('Player Search Profile Controller', () => {
    let createdProfileIds = [];


    afterAll(async () => {
        if (createdProfileIds.length > 0) {
            await playerSearchProfileModel.deleteMany({ _id: { $in: createdProfileIds } });
            createdProfileIds = [];
        }
    });

    test('should create a new player profile for testing', async () => {
        const res = await request(app)
            .post('/api/v1/playerSearchProfile/create-search-player-profile') 
            .send({
                name: 'Test Player',
                age: 25,
                team: 'Test Team',
                position: 'Forward'
            })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('data save successfully');
        expect(res.body.data).toHaveProperty('name', 'Test Player');

        createdProfileIds.push(res.body.data._id);
    });


    test('should search for player profiles by name successfully', async () => {
        const res = await request(app)
            .get('/api/v1/playerSearchProfile/get-search-player-profile') 
            .query({ q: 'Test Player' })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0]).toHaveProperty('name', 'Test Player');
    });


    test('should return an empty array if no player profiles match the search query', async () => {
        const res = await request(app)
            .get('/api/v1/playerSearchProfile/get-search-player-profile') 
            .query({ q: 'Nonexistent Player' })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBe(0);
    });


    test('should return all player profiles if no query is provided', async () => {
        const res = await request(app)
            .get('/api/v1/playerSearchProfile/get-search-player-profile') 
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
    });
});
