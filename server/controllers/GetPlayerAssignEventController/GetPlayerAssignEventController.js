const { Team } = require('../../models/teamModel');
const createdEventModel = require("../../models/CreateEventModel/createEventModel")

const GetPlayerAssignEventController = async (req, res) => {
        try {
            const { playerId } = req.body;
            const assignedEventDetails = [];
    
            // Fetch all teams that have the specified player
            const teamsWithPlayer = await Team.find({ players: playerId });
    
            // Extract match IDs from the teams
            const matchIds = teamsWithPlayer.map(team => team.match_id);
    
            // Fetch all events where the match ID is in the list of match IDs
            const events = await createdEventModel.find({ _id: { $in: matchIds } });
    
            // Filter and collect the event details
            assignedEventDetails.push(...events);
    
            // Send a successful response with the fetched data
            res.status(200).send({
                success: true,
                message: "Team Model Get Successfully",
                data: assignedEventDetails
            });
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error in GetPlayerAssignEventController:', error);
    
            // Send an error response with the error message
            res.status(400).send({
                success: false,
                message: "Error in GetPlayerAssignEventController",
                error: error.message
            });
        }
    };
    
    


module.exports = {GetPlayerAssignEventController}