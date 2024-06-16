const mongoose = require('mongoose');

//const { Coach } = require('../models/coachModel');
//const Coach = require('../models/CoachProfileModel/CoachProfileModel')
//const { Match } = require('../models/matchModel')
const Match = require('../models/CreateEventModel/createEventModel')
//const Player  = require('../models/playerAatheek')
const User = require('../models/userModel')
const { Team } = require('../models/teamModel');
const createdEventModel = require("../models/CreateEventModel/createEventModel")


const getMatches = async (req, res) => {
    try {
        const coachId = new mongoose.Types.ObjectId(req.query.coach_id); // Convert coach_id to ObjectId
        console.log(`\n coachId : ${coachId} \n`)

        /*
        // Step 1: Get all matches that are not referenced in any team
        const unmatchedMatches = await Match.find({
            _id: { $nin: await Team.distinct('match_id') }
        });

        // Step 2: Get all matches referenced in teams where coach_id is not the same
        const matchedMatches = await Match.find({
            _id: { $in: await Team.distinct('match_id', { coach_id: { $ne: coachId } }) }
        });

        console.log(`\n\n not same coach id teams matches : \n\n ${matchedMatches}`)

        // Combine both sets of matches
        const allMatches = [...unmatchedMatches, ...matchedMatches];
        console.log(`matches for team create : \n ${allMatches}`)
        */

        const allMatches = await Match.find({ coaches: { $nin: [coachId] } })
        console.log('all matches : \n', allMatches)

        const eventData = await createdEventModel.find({})
        const assignMatches = []

        for (let i = 0; i < eventData.length; i++) {
            if(eventData[i].coaches.includes(coachId)){
                assignMatches.push(eventData[i])
            }
        }


        // res.json(allMatches);
        
        res.status(200).send({
            success: true,
            message: 'Matches fetched successfully',
            data: assignMatches,
        })



    } catch (err) {
        console.log(err);
    }
}

/* const getPlayers = async (req, res) => {
    try {
        const matchId = req.query.match_id; 
        const coachId = req.query.coach_id;

        console.log('match_id : ', matchId);
        console.log('coach_id : ', coachId);

        // Get all players not in any team with the same match_id
        const unmatchedPlayers = await User.find({
            _id: { $nin: await Team.distinct('players', { match_id: matchId }) }
        });

        // Get already existing players
        const existPlayers = await Player.find({
            _id: { $in: await Team.distinct('players', {coach_id:coachId, match_id:matchId}) }
        })

        //combine all players
        const allPlayers = [...unmatchedPlayers, ...existPlayers]
        console.log('players not in any team for the match : \n', unmatchedPlayers)
        res.json(allPlayers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}; */


const getPlayers = async (req, res) => {
    try {
        const matchId = req.query.match_id;
        const coachId = req.query.coach_id;

        console.log('match_id : ', matchId);
        console.log('coach_id : ', coachId);

        // Step 1: Find all teams associated with the specific match
        const teamsExist = await Team.find({ match_id: matchId });
        const teamPlayerIds = teamsExist.reduce((acc, team) => acc.concat(team.players), []);

        // Step 3: Find all users with isPlayer: true that are not in the list of team players
        const validNotExistPlayers = await User.find({
            isPlayer: true,
            _id: { $nin: teamPlayerIds }
        });

        console.log('players not in any team for this match : \n', validNotExistPlayers)


        // Get already existing players
        const teamsNotExist = await Team.find({ match_id: matchId, coach_id: coachId });
        const existPlayerIds = teamsNotExist.reduce((acc, team) => acc.concat(team.players), []);
        const validExistPlayers = await User.find({
            isPlayer: true,
            _id: { $in: existPlayerIds }
        })

        console.log('players in this coach\'s team for this match : \n', validExistPlayers)

        //combine all players
        const allPlayers = [...validNotExistPlayers, ...validExistPlayers]
        res.json(allPlayers);
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

        // Generate unique teamNo
        const lastTeam = await Team.findOne().sort({ teamNo: -1 }); // Get the last team based on teamNo
        let nextTeamNo = 1; // Default to 1 if no teams exist

        if (lastTeam && !isNaN(lastTeam.teamNo.slice(1))) {
            nextTeamNo = parseInt(lastTeam.teamNo.slice(1)) + 1;
        }

        // Convert nextTeamNo to a string and format as 'T' followed by at least 3 digits
        const formattedTeamNo = 'T' + nextTeamNo.toString().padStart(3, '0');

        // Team update
        const newTeam = new Team({
            teamName: team.teamName,
            teamNo: formattedTeamNo,
            match_id: team.matchId,
            coach_id: team.coachId,
            players: team.selectedPlayers
        });

        const savedTeam = await newTeam.save();
        console.log('\n\nSaved team : \n', savedTeam);

        /*
        //Player update
        for (let player_id of savedTeam.players) {
            const player = await Player.findById(player_id)
            player.teams.push(savedTeam._id)
            player.matches.push(savedTeam.match_id)
            const updatedPlayer = await player.save();
            console.log('\n\nUpdated player: \n', updatedPlayer)
        }

        //Coach update
        const coach = await Coach.findById(savedTeam.coach_id)
        coach.teams.push(savedTeam._id)
        const updatedCoach = await coach.save();
        console.log('\n\nUpdated coach :\n', updatedCoach)
        */

        //Match update
        const match = await Match.findById(savedTeam.match_id)
        match.teams.push(savedTeam._id)
        match.coaches.push(savedTeam.coach_id)
        const updatedMatch = await match.save();
        console.log('\n\nUpdated match :\n', updatedMatch)


        res.status(200).json({ success: true, team: savedTeam })

    } catch (er) {
        console.error('Error saving team : ', er)
        res.status(500).json({ success: false, error: 'save team internal serv error' })
    }
}



const getTeams = async (req, res) => {
    try {
        const coach_id = req.query.coach_id
        console.log(coach_id, ' : coach Id')

        const teams = await Team.find({ coach_id: coach_id });

        res.json(teams);

    } catch (er) {
        res.json(er)
    }
}


/* const getPlayersTeamUpdate = async (req, res) => {
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
        const team_id = editedTeam._id

        console.log('edited data for team ID : ', team_id, ' \n', editedTeam);

        // Update the team
        const updatedTeam = await Team.findByIdAndUpdate(team_id, editedTeam, { new: true, overwrite: true });
        console.log('\n\nupdated team data : ', updatedTeam);

        /* // Find the existing team data
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
        */

        res.json({ success: true });

    } catch (er) {
        console.log('team update error : ', er)
    }
}


const deleteTeam = async (req, res) => {
    try {
        const team_id = req.query.team_id;
        const deletedTeam = await Team.findByIdAndDelete(team_id)
        console.log('\ndeleted team :\n', deletedTeam);


        const coach_id = deletedTeam.coach_id
        //await Coach.findByIdAndUpdate(coach_id, { $pull: { teams: team_id } });

        const match_id = deletedTeam.match_id
        console.log('282 : ', match_id)
        await Match.findByIdAndUpdate(match_id, { $pull: { teams: team_id, coaches: coach_id } })

        /*
        const delplayers = deletedTeam.players
        for (var player_id of delplayers) {
            console.log('player id : ', player_id)
            const updPlayer = await Player.findByIdAndUpdate(player_id, { $pull: { teams: team_id, matches: match_id } })
            console.log('player after del team', updPlayer)
        }
        */

        res.json({ success: true })

    } catch (er) {
        console.log('error in deleting team', er)
    }
}



module.exports = { getMatches, getPlayers, createMatch, createTeam, editTeam, getTeams, deleteTeam }