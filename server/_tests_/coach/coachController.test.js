const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index'); // Assuming your Express app is exported from index.js
const User = require('../../models/userModel');
const { Team } = require('../../models/teamModel');
const Match = require('../../models/CreateEventModel/createEventModel');

/* beforeAll(async () => {
    const dbURI = 'mongodb://localhost:27017/testdb'; // Replace with your test database URI
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
}); */

describe('Coach Controller', () => {
    let testCoachId;
    let testMatchId;
    let testPlayerId;
    let testTeamId;

    beforeAll(async () => {
        const testCoach = new User({ username: 'coach', email: 'coach@example.com', password: 'password', isCoach: true });
        await testCoach.save();
        testCoachId = testCoach._id;

        const testPlayer = new User({ username: 'player', email: 'player@example.com', password: 'password', isPlayer: true });
        await testPlayer.save();
        testPlayerId = testPlayer._id;

        const testMatch = new Match({ nameOfTheEvent: 'Test Event', location: 'Test Location', numberOfTeams: 4 });
        await testMatch.save();
        testMatchId = testMatch._id;
    });

    afterAll(async () => {
        await User.findByIdAndDelete(testCoachId);
        await User.findByIdAndDelete(testPlayerId);
        await Match.findByIdAndDelete(testMatchId);
        if (testTeamId) {
            await Team.findByIdAndDelete(testTeamId);
        }
    });

    test('GET /api/v1/coach/matches - Get Matches', async () => {
        const response = await request(app)
            .get('/api/v1/coach/matches')
            .query({ coach_id: testCoachId })
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Matches fetched successfully');
    }, 20000);

    test('GET /api/v1/coach/players - Get Players', async () => {
        const response = await request(app)
            .get('/api/v1/coach/players')
            .query({ match_id: testMatchId, coach_id: testCoachId })
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
    }, 20000);

    test('POST /api/v1/coach/create-team - Create Team', async () => {
        const teamData = {
            teamName: 'Test Team',
            matchId: testMatchId,
            coachId: testCoachId,
            selectedPlayers: [testPlayerId]
        };

        const response = await request(app)
            .post('/api/v1/coach/create-team')
            .send(teamData)
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.team.teamName).toBe(teamData.teamName);
        testTeamId = response.body.team._id;
    }, 20000);

    test('GET /api/v1/coach/teams - Get Teams', async () => {
        const response = await request(app)
            .get('/api/v1/coach/teams')
            .query({ coach_id: testCoachId })
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
    }, 20000);

    test('POST /api/v1/coach/update-team - Edit Team', async () => {
        const editedTeamData = {
            teamData: {
                _id: testTeamId,
                teamName: 'Updated Test Team',
                match_id: testMatchId,
                coach_id: testCoachId,
                players: [testPlayerId]
            }
        };

        const response = await request(app)
            .post('/api/v1/coach/update-team')
            .send(editedTeamData)
            .expect(200);

        expect(response.body.success).toBe(true);
    }, 20000);

    test('DELETE /api/v1/coach/delete-team - Delete Team', async () => {
        const response = await request(app)
            .delete('/api/v1/coach/delete-team')
            .query({ team_id: testTeamId })
            .expect(200);

        expect(response.body.success).toBe(true);
    }, 20000);
});
