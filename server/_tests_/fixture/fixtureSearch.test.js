const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');
const createFixtureModel = require('../../models/CreateFixtureModel/CreateFixtureModel');

describe('Fixture Search Controller', () => {
    let createdFixtureIds = [];
    let date1, date2;

    afterAll(async () => {
        if (createdFixtureIds.length > 0) {
            await createFixtureModel.deleteMany({ _id: { $in: createdFixtureIds } });
            createdFixtureIds = [];
        }
    }, 20000);


    test('should create a new fixture for testing', async () => {
        const res = await request(app)
            .post('/api/v1/create/create-fixture')
            .send({
                nameOfTheEvent: 'Test Event 1',
                nameOfTheTeam: ['Test Team'],
                location: 'Test Location',
                eventNewDate: '2025-05-05',
                formattedTime: '12:00 PM'
            })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Fixture Created Successfully');
        expect(res.body.data).toHaveProperty('location', 'Test Location');

        createdFixtureIds.push(res.body.data._id);
        date1 = res.body.data.eventNewDate
    }, 30000);


    test('should create another new fixture for testing', async () => {
        const res2 = await request(app)
            .post('/api/v1/create/create-fixture')
            .send({
                nameOfTheEvent: 'Test Event 2',
                nameOfTheTeam: ['Test Team2'],
                location: 'Test Location',
                eventNewDate: '2025-04-04',
                formattedTime: '12:00 PM'
            })
            .expect(200);

        expect(res2.body.success).toBe(true);
        expect(res2.body.message).toBe('Fixture Created Successfully');
        expect(res2.body.data).toHaveProperty('location', 'Test Location');

        createdFixtureIds.push(res2.body.data._id);
        date2 = res2.body.data.eventNewDate
    }, 30000);


    test('should search for fixtures by location successfully', async () => {
        const res = await request(app)
            .post('/api/v1/search/data')
            .send({
                value: 'Test Location'
            })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Data Search Successfully');
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0]).toHaveProperty('location', 'Test Location');
        expect(res.body.data[1]).toHaveProperty('location', 'Test Location');
    }, 20000);


    test('should search for fixtures by date successfully', async () => {
        const res = await request(app)
            .post('/api/v1/search/data')
            .send({
                searchDate: date1
            })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Data Search Successfully');
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0]).toHaveProperty('eventNewDate', date1);
    }, 20000);


    test('should search for fixtures by location and date successfully', async () => {
        const res = await request(app)
            .post('/api/v1/search/data')
            .send({
                value: 'Test Location',
                searchDate: date2
            })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Data Search Successfully');
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0]).toHaveProperty('location', 'Test Location');
        expect(res.body.data[0]).toHaveProperty('eventNewDate', date2);
    }, 20000);
});
