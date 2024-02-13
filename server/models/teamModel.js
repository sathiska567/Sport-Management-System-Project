const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: String,

  teamId: {type:String, unique:true},

  coachId: {
    type: String,
    ref: 'Coach'
  },
  players: [{
    type: String,
    ref: 'Player'
  }],
  matchId: {
    type: String,
    ref: 'Match'
  }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = {Team};
