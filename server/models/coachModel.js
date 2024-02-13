const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
  name: String,
  coachId: String,
  teams: [{
    type: String, unique:true,
    ref: 'Team'
  }]
});

const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;
