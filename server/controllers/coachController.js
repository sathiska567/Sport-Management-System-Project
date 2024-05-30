
const { Coach } = require('../models/coachModel');
const { Match } = require('../models/matchModel')
const { Player } = require('../models/playerModel')
const { Team } = require('../models/teamModel')


const getMatches = async (req, res) => {
    try {
        console.log('req came : ', req.query.coach_id)
        const matches = await Match.find({ coaches: { $ne: req.query.coach_id } });

        console.log(matches);
        res.json(matches);
    } catch (err) {
        console.log(err);
    }
}

const getPlayers = async (req, res) => {
    try {
        const match_id = req.query.match_id; // Extract matchId from req.params
        console.log('match_id : ', match_id)

        // Find players whose status is "available" and who do not have the given matchId
        const players = await Player.find();
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

        //Team update
        const newTeam = new Team({
            teamName: team.teamName,
            teamNo: team.teamNo,
            match_id: team.matchId,
            coach_id: team.coachId,
            players: team.selectedPlayers
        })

        const savedTeam = await newTeam.save()
        console.log('\n\nSaved team : \n', savedTeam)

        //Player update
        for (let player_id of savedTeam.players) {
            const player = await Player.findById(player_id)
            player.teams.push(savedTeam._id)
            player.matches.push(savedTeam.match_id)
            const updatedPlayer = await player.save();
            console.log('\n\nUpdated player: \n', updatedPlayer)
        }

        //Match update
        const match = await Match.findById(savedTeam.match_id)
        match.teams.push(savedTeam._id)
        match.coaches.push(savedTeam.coach_id)
        const updatedMatch = await match.save();
        console.log('\n\nUpdated match :\n', updatedMatch)

        //Coach update
        const coach = await Coach.findById(savedTeam.coach_id)
        coach.teams.push(savedTeam._id)
        const updatedCoach = await coach.save();
        console.log('\n\nUpdated coach :\n', updatedCoach)

        res.status(200).json({ success: true, team: savedTeam })

    } catch (er) {
        console.error('Error saving team : ', er)
        res.status(500).json({ success: false, error: 'save team internal serv error' })
    }
}



const getTeams = async (req, res) => {
    try {
        const coach_id = req.query.coach_id
        console.log("\nreq for teams of coach ID : ", coach_id)
        const coach = await Coach.findById(coach_id).populate('teams');
        console.log(coach)
        res.json(coach.teams)

    } catch (er) {
        res.json(er)
    }
}


/*
const getPlayersTeamUpdate = async (req, res) => {
    try {
        const team_id = req.query.team_id
        console.log('\nreq for team players , team_id : ', team_id);
        const players = await Player.find()
        console.log(players)
        res.json({success:true, players: players})
    }catch(err){
        console.log('players getting error : ', err)
    }
    

}
*/

const editTeam = async (req, res) => {
    try {
        const editedTeam = req.body.teamData
        const team_id = req.query.team_id
        const match_id = editedTeam.match_id
        console.log('edited data for team ID : ', team_id, ' \n', editedTeam);

        // Find the existing team data
        const existingTeam = await Team.findById(team_id);
        const existingPlayers = existingTeam.players || [];

        // Find newly added players
        const newPlayers = editedTeam.players.filter(player_id => !existingPlayers.includes(player_id));

        // Find removed players
        const removedPlayers = existingPlayers.filter(player_id => !editedTeam.players.includes(player_id));

        // Update the team
        const updatedTeam = await Team.findByIdAndUpdate(team_id, editedTeam, { new: true, overwrite: true });
        console.log('\n\nupdated team data : ', updatedTeam);


        // Add the team_id to teams array of each newly added player
        await Player.updateMany({ _id: { $in: newPlayers } }, { $addToSet: { teams: team_id, matches: match_id } });

        // Remove the team_id from teams array of each removed player
        await Player.updateMany({ _id: { $in: removedPlayers } }, { $pull: { teams: team_id, matches: match_id } });

    } catch (er) {
        console.log('team update error : ', er)
    }
}


const deleteTeam = async (req, res) => {
    try {
        const team_id = req.query.team_id;
        const deletedTeam = await Team.findByIdAndDelete(team_id)
        console.log('\ndeleted team :\n', deletedTeam);

        const coach_id = req.query.coach_id
        await Coach.findByIdAndUpdate(coach_id, { $pull: { teams: team_id } });

        const match_id = req.query.match_id
        await Match.findByIdAndUpdate(match_id, { $pull: { teams: team_id, coaches: coach_id } })

        const delplayers = deletedTeam.players
        for (var player_id of delplayers) {
            console.log('player id : ', player_id)
            const updPlayer = await Player.findByIdAndUpdate(player_id, { $pull: { teams: team_id, matches: match_id } })
            console.log('player after del team', updPlayer)
        }

        res.json({ success: true })

    } catch (er) {
        console.log('error in deleting team', er)
    }
}



module.exports = { getMatches, getPlayers, createMatch, createTeam, editTeam, getTeams, deleteTeam }