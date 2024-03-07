const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
  name: String,
  coachNo: String,
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }]
});

const Coach = mongoose.model('Coach', coachSchema);

module.exports = {Coach};
