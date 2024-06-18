const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');
const createFixtureModel = require('../../models/CreateFixtureModel/CreateFixtureModel');
//const deletedFixtureModel = require('../../models/DeletedFixtureModel/DeletedFixtureModel');

describe('deleteFixtureController', () => {
    let fixtureIdToDelete;

    beforeAll(async () => {
        // Create a fixture in createFixtureModel to delete in tests
        const fixture = await createFixtureModel.create({
            nameOfTheEvent: 'Test Event',
            nameOfTheTeam: ['Test Team'],
            location: 'Test Location',
            eventNewDate: new Date(),
            formattedTime: '12:00 PM'
        });
        fixtureIdToDelete = fixture._id;
    }, 50000);


    /* afterEach(async () => {
        // Clean up: Delete any fixtures created during tests
        await createFixtureModel.deleteMany({});
        await deletedFixtureModel.deleteMany({});
    }); */

    test('should delete a fixture and save to deletedFixtureModel', async () => {
        // Send a DELETE request to the controller function
        const res = await request(app)
            .post('/api/v1/delete/delete-fixture') 
            .send({ id: fixtureIdToDelete })
            .expect(200);

        // Assertions for successful deletion response
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Fixture Deleted Successfully');

        // Check if the fixture is no longer present in createFixtureModel
        const fixtureInDatabase = await createFixtureModel.findOne({ _id: fixtureIdToDelete });
        expect(fixtureInDatabase).toBeNull();
    });


    test('should handle errors when deleting a fixture', async () => {
        const invalidId = 'invalidId123'; // Invalid ID that doesn't exist

        // Send a DELETE request with invalid data
        const res = await request(app)
            .post('/api/v1/delete/delete-fixture') // Adjust the route as per your actual setup
            .send({ id: invalidId })
            .expect(400);

        // Assertions for error response
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Error Occured In Deleting Fixture');
        expect(res.body.error).toBeDefined();
    });
});

