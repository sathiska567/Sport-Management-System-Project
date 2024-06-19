const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index'); // Adjust the path to your app entry point
const createEventModel = require('../../models/CreateEventModel/createEventModel');

describe('Event Controllers', () => {
    let createdEventIds = [];
    let event;

    afterAll(async () => {
        await createEventModel.deleteMany({ _id: { $in: createdEventIds } });
        createdEventIds = [];
    }, 20000);


    test('should create a new event successfully', async () => {
        const res = await request(app)
            .post('/api/v1/event/create-event')
            .send({
                nameOfTheEvent: 'Test Event',
                location: ['Test Location'],
                numberOfTeams: 4,
                eventNewDate: '2025-07-28',
                formattedTime: '12:00 PM'
            })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Event Created Successfully');
        expect(res.body.data).toHaveProperty('eid');
        expect(res.body.data).toHaveProperty('nameOfTheEvent', 'Test Event');
        expect(res.body.data).toHaveProperty('location', 'Test Location');

        createdEventIds.push(res.body.data._id);
        event = res.body.data
    }, 20000);

    test('should fetch all events successfully', async () => {
        const res = await request(app).get('/api/v1/event/get-all-events').expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('All Events Fetch successfull');
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
    }, 20000);

    test('should add a coach to an event successfully', async () => {
        const coachid = new mongoose.Types.ObjectId();
        const res = await request(app)
            .post('/api/v1/event/assignCoaches')
            .send({
                eventId: event._id,
                coachId: coachid
            })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Coach Added Successful');
        expect(res.body.data.coaches).toContain(coachid.toString());
    }, 20000);

    test('should fetch events with pagination', async () => {
        const res = await request(app)
            .post('/api/v1/event/pagination')
            .send({ page: 1 })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Data fetched successfully');
        expect(res.body.data.events.length).toBeLessThanOrEqual(5);
        expect(res.body.data).toHaveProperty('totalDocuments');
        expect(res.body.data).toHaveProperty('totalPages');
        expect(res.body.data).toHaveProperty('currentPage', 1);
    }, 20000);
});
