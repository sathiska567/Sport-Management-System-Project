const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: String,

  teamNo: {type:String, unique:true},

  coach_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coachProfile'
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player(Aatheek)'
  }],
  match_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = {Team};
