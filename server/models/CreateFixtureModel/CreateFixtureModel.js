const mongoose = require('mongoose');

const createFixtureSchema = new mongoose.Schema({
  nameOfTheEvent: {
    type: String,
    required: [true, 'Event Name is required']
  },

  location: {
    type: String,
    required: [true, 'Location is required']
  },

  // numberOfTeams:{
  //   type:String,
  //   required:[true ,'Number of team is required']
  // },

  nameOfTheTeam: {
    type: Array,
    required: [{ type: String, required: true }]
  },

  createdFixtureId: {
    type: Object,
    default: ""
  },

  eventNewDate: {
    type: String,
    required: ["Please enter Date of the event", false]
  },

  formattedTime: {
    type: String,
    required: ["Please enter Starting time of the event", false]
  },

  rounds: [{
    roundNumber: String,
    pairs: [],
    winners: [],
  }],

})


const createFixtureModel = mongoose.model('createFixtureModel', createFixtureSchema);

module.exports = createFixtureModel;