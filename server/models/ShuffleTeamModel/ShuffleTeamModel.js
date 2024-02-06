const mongoose = require('mongoose');

const newTeamModelSchema = new mongoose.Schema({
  shuffleTeam: {
    type: [String], 
    default: [],
  },
});

const newTeam = mongoose.model('shuffleTeamModel', newTeamModelSchema);

module.exports = newTeam;