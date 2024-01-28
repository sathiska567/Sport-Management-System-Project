const mongoose = require('mongoose');

const newTeamModelSchema = new mongoose.Schema({
  newTeam: {
    type: [String], 
    default: [],
  },
});

const newTeam = mongoose.model('NewTeamModel', newTeamModelSchema);

module.exports = newTeam;