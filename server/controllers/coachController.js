
const Coach = require('../models/coachModel');
const { Match } = require('../models/matchModel')
const { Player } = require('../models/playerModel')
const { Team } = require('../models/teamModel')


const getMatches = async (req, res) => {
    try {
        console.log('req came')
        const matches = await Match.find({coaches: { $ne: req.query.coachId }});
        
        console.log(matches);
        res.json(matches);
    } catch (err) {
        console.log(err);
    }
}

const getPlayers = async (req, res) => {
    try {
        const matchId = req.query.matchId; // Extract matchId from req.params
        console.log(matchId)

        // Find players whose status is "available" and who do not have the given matchId
        const players = await Player.find({ Status: 'available', matches: { $ne: matchId } });
        console.log(players)
        res.json(players);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const createMatch = async (req, res) => {
    try {
        const match = req.body;
        console.log('matchData received : ', match);

        const newMatch = new Match({
            name: match.matchName,
            matchId: match.matchId,
            location: match.location,

        })

        const savedMatch = await newMatch.save();
        console.log('match saved! : ', savedMatch);
        res.status(200).json({ success: true, match: savedMatch });
    } catch (er) {
        console.log(er)
        res.status(500).json({ success: false, error: 'match internal serv err' })
    }
}


const createTeam = async (req, res) => {
    try {
        const team = req.body;
        console.log('Team data received : ', team);

        const existTeam = await Team.findOne({ teamId: team.teamId })

        if (existTeam) {
            existTeam.players.push(team.playerId);
            const updatedTeam = await existTeam.save();
            res.status(200).json({ success: true, team: updatedTeam })
        } else {
            const newTeam = new Team({
                teamName: team.teamName,
                teamId: team.teamId,
                matchId: team.matchId,
                coachId: team.coachId,
                players: [team.playerId]
            })

            const savedTeam = await newTeam.save()

            const match = await Match.findOne({ matchId: team.matchId })
            match.teams.push(team.teamId)
            match.coaches.push(team.coachId)
            await match.save();

            const coach = await Coach.findOne({coachId: team.coachId})
            coach.teams.push(team.teamId)
            await coach.save();

            res.status(201).json({ success: true, team: savedTeam })

        }

        const player = await Player.findOne({ PlayerId: team.playerId })
        player.matches.push(team.matchId);
        player.teams.push(team.teamId);
        await player.save();



    } catch (er) {
        console.error('Error saving team : ', er)
        res.status(500).json({ success: false, error: 'save team internal serv error' })
    }
}




module.exports = { getMatches, getPlayers, createMatch, createTeam }