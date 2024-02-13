const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    name: String,

    matchId: {type: String, unique:true},

    location: String,

    teams: [{
      type: String,
      ref: 'Team'
    }],

    coaches: [{
      type: String,
      ref: 'Coach'
    }],
    
    rounds: [{
      roundNumber: String,
      pairs: [],
      winners: [],
    }],
  });


const Match = mongoose.model('Match', matchSchema);

module.exports = { Match };