const request = require('supertest');
const app = require('../../index'); // Assuming your Express app is exported from index.js
const Fixture = require('../../models/CreateFixtureModel/CreateFixtureModel');

describe('createFixtureController', () => {
    let newFixtureId; // Variable to store the ID of the newly created fixture

    afterAll(async () => {
        if (newFixtureId) {
            await Fixture.findByIdAndDelete(newFixtureId);
        }
    }, 20000);

    // Test case for successful fixture creation
    test('should create a new fixture', async () => {
        const fixtureData = {
            nameOfTheEvent: 'Test Event',
            nameOfTheTeam: 'Test Team',
            location: 'Test Location',
            eventNewDate: new Date(),
            formattedTime: '12:00 PM'
        };

        // Send a POST request to the controller function
        const res = await request(app)
            .post('/api/v1/create/create-fixture') 
            .send(fixtureData)
            .expect(200);

            //console.log(res.body)
        // Assertions
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Fixture Created Successfully');
        expect(res.body.data).toBeInstanceOf(Object);
        expect(res.body.data.nameOfTheEvent).toBe(fixtureData.nameOfTheEvent);

        // Capture the ID of the newly created fixture
        newFixtureId = res.body.data._id;

        // Check if the fixture was actually saved in the database
        const savedFixture = await Fixture.findOne({ _id: newFixtureId });
        expect(savedFixture).not.toBeNull();
    }, 20000);

    // Test case for handling errors
    test('should handle errors when creating a fixture', async () => {
        const invalidFixtureData = {
            // Provide incomplete or invalid data to force an error
            nameOfTheEvent: 'Incomplete Event',
            // Missing other required fields intentionally
        };

        // Send a POST request with invalid data
        const res = await request(app)
            .post('/api/v1/create/create-fixture') // Adjust the route as per your actual setup
            .send(invalidFixtureData)
            .expect(400);

        // Assertions for error response
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Fixture Created Unsuccessfully');
        expect(res.body.data).toBeUndefined(); // Since data will be undefined in case of error
    }, 20000);

});
