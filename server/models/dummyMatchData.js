const mongoose = require('mongoose');
const { Team } = require('../models/teamModel');
const { Match } = require('../models/matchModel');


const saveMatchData = async ()=>{

    console.log('hi from dummyMatch')
// Assume you have team documents in the Team collection
const team1 = await Team.findOne({ name: 'A' });
const team2 = await Team.findOne({ name: 'B' });
const team3 = await Team.findOne({ name: 'C' });

// Example match data
const matchData = {
  name: 'Example Match',
  matchId: 123, // Assuming matchId is a unique identifier for matches
  //teams: [team1.name, team2.name, team3.name ], // Referencing the team IDs
  rounds: [
    {
      
    },
  ],
};

// Create a new Match instance with the match data
const match = new Match(matchData);


// Save the match to the database
try{
    await match.save();
    console.log('match saved')
}catch(error){
    console.log('match not saved', error)
}
}

module.exports = {saveMatchData}