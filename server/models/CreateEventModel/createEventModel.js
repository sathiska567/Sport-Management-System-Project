const mongoose = require("mongoose");

const createEventSchema = new mongoose.Schema({
      nameOfTheEvent: {
            type: String,
            required: [true, "Please enter the name of the event"]
      },

      location: {
            type: String,
            required: [true, "Please enter the location of the event"]
      },
      
      numberOfTeams: {
            type: Number,
            required: [true, "Please enter the number of teams for the event"]
      },
      eventNewDate: {
            type: String,
            required: [false, "Please enter the date of the event"]
      },
      formattedTime: {
            type: String,
            required: [false, "Please enter the starting time of the event"]
      },
      teams: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
      }],
      coaches: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
      }],
      refereeId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'referee'
      }],
      availableSetPlayerId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'availableSetPlayer'
      }],
      
      eid:{
            type: String
      }
});

const createEvent = mongoose.model("createEvent", createEventSchema);
module.exports = createEvent;
