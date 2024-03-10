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
    ref: 'playerProfile'
  }],
  match_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ceateEvent'
  }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = {Team};
