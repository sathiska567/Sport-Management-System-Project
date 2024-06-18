const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { getWinners, setWinners, createRound, getMatches } = require('../../controllers/organizerController');
const { createFixtureController } = require('../../controllers/CreateFixtureController/CreateFixtureController');
const { Team } = require('../../models/teamModel');
const createFixtureModel = require('../../models/CreateFixtureModel/CreateFixtureModel');
const Shuffle = require('../../models/ShuffleTeamModel/ShuffleTeamModel');

// Initialize Express app
const app = require('../../index')


// Connect to test database before running tests
/* beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test_database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}); */



// Close the database connection after all tests
/* afterAll(async () => {
    await mongoose.connection.close();
}); */

describe('Organizer Controller Tests', () => {

    let matchId, shuffleTeamId, createdFixtureId;

    beforeAll(async () => {
        // Create fixture and shuffle team for tests
        const fixture = new createFixtureModel({
            nameOfTheEvent: "Test Event",
            nameOfTheTeam: ["Team A", "Team B"],
            location: "Test Location",
            eventNewDate: "2023-06-17",
            formattedTime: "10:00 AM",
        });

        await fixture.save();
        matchId = fixture._id;

        const shuffleTeam = new Shuffle({
            shuffleTeam: ["Team A", "Team B"]
        });

        await shuffleTeam.save();
        shuffleTeamId = shuffleTeam._id;

        fixture.createdFixtureId = shuffleTeamId;
        await fixture.save();
        createdFixtureId = fixture.createdFixtureId;
    });

    // Clean up the test database after each test
    afterAll(async () => {
        await createFixtureModel.findByIdAndDelete(matchId);
        await Shuffle.findByIdAndDelete(shuffleTeamId);
        await Team.deleteMany({ match_id: matchId });
    });

    test('GET /api/v1/organizer/matches', async () => {
        const response = await request(app)
            .get('/api/v1/organizer/matches');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    }, 10000);

    test('GET /api/v1/organizer/create-round/:matchId/:roundNo', async () => {
        const response = await request(app)
            .get(`/api/v1/organizer/create-round/${matchId}/1`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    }, 10000);

    test('POST /api/v1/organizer/setWinners/:matchId/:roundNo', async () => {
        const response = await request(app)
            .post(`/api/v1/organizer/setWinners/${matchId}/1`)
            .send({ winnersArray: ["Team A"] });

       // console.log(response.body)
        expect(response.body.message).toBe('final winner already selected')
        expect(response.body.finalWinner).toBe('Team A')
        expect(response.status).toBe(200);
        expect(response.body.rounds[0].winners).toContain("Team A");
    }, 10000);

    test('GET /api/v1/organizer/getWinners/:matchId', async () => {
        const response = await request(app)
            .get(`/api/v1/organizer/getWinners/${matchId}`);

        expect(response.status).toBe(200);
        expect(response.body.match).toHaveProperty('_id', matchId.toString());
    });

    /* test('POST /api/v1/organizer/create-fixture', async () => {
        const response = await request(app)
            .post('/api/v1/organizer/create-fixture')
            .send({
                nameOfTheEvent: "Another Test Event",
                nameOfTheTeam: ["Team C", "Team D"],
                location: "Another Test Location",
                eventNewDate: "2023-06-18",
                formattedTime: "11:00 AM"
            });

        expect(response.status).toBe(200);
        expect(response.body.data.nameOfTheEvent).toBe("Another Test Event");
    }, 10000); */
});
