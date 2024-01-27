const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  
});




const Team = mongoose.model('Team', teamSchema);

module.exports = { Team };










