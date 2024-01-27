const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    name: String,
    matchId: {type: Number, unique:true},
    teams: [],
    rounds: [{
      roundNumber: {type: Number, unique:true},
      pairs: [],
      winners: [],
    }],
  });


const Match = mongoose.model('Match', matchSchema);

module.exports = { Match };