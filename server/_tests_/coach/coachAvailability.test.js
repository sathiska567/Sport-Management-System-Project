const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');
const coachAvailabilityModel = require('../../models/CoachAvailabilityModel/CoachAvailabilityModel');






describe('coachAvailabilityController', () => {

    let createdDocuments = [];
    afterEach(async () => {
        // Delete only the newly created documents
        await coachAvailabilityModel.deleteMany({
            _id: { $in: createdDocuments }
        });
        createdDocuments = [];
    });


    test('should add new availability if none exists', async () => {
        const res = await request(app)
            .post('/api/v1/availability/save-coach-availability')
            .send({
                eventId: 'newEventId',
                coachId: 'newCoachId',
                availability: true
            })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Availability added successfully');
        expect(res.body.setAvailability).toHaveProperty('eventId', 'newEventId');
        expect(res.body.setAvailability).toHaveProperty('coachId', 'newCoachId');
        expect(res.body.setAvailability).toHaveProperty('availability', true);

         // Store the created document ID for cleanup
        createdDocuments.push(res.body.setAvailability._id); 
    }, 10000);


    test('should update existing availability', async () => {
        const existingData = await coachAvailabilityModel.create({
            eventId: 'existingEventId',
            coachId: 'existingCoachId',
            availability: false
        });

        const res = await request(app)
            .post('/api/v1/availability/save-coach-availability')
            .send({
                eventId: existingData.eventId,
                coachId: existingData.coachId,
                availability: true
            })
            .expect(200);

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Availability added successfully');
        expect(res.body.setAvailability).toHaveProperty('eventId', 'existingEventId');
        expect(res.body.setAvailability).toHaveProperty('coachId', 'existingCoachId');
        expect(res.body.setAvailability).toHaveProperty('availability', true);

         // Store the updated document ID for cleanup
         createdDocuments.push(res.body.setAvailability._id);

         // Clean up the initially created document as well
         createdDocuments.push(existingData._id);
    });

    test('should handle errors when adding availability', async () => {
        const res = await request(app)
            .post('/api/v1/availability/save-coach-availability')
            .send({
                eventId: null, // Invalid data to trigger error
                coachId: null,
                availability: true
            })
            .expect(400);

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Availability added Unsuccessfully');
        expect(res.body).toHaveProperty('error');
    }, 10000);
});
