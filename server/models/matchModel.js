const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  name: String,

  matchNo: { type: String, unique: true },

  location: String,

  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],

  coaches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach'
  }],

  rounds: [{
    roundNumber: String,
    pairs: [],
    winners: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    }],
  }],
});


const Match = mongoose.model('Match', matchSchema);

module.exports = { Match };