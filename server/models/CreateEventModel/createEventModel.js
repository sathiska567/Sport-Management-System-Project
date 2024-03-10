const mongoose = require("mongoose");


const createEventSchema = new mongoose.Schema({
      name: {
            type: String,
            required: ["Please enter name of the event", true]
      },

      location: {
            type: String,
            required: ["Please enter location of the event", true]
      },

      numberOfTeams: {
            type: Number,
            //required: ["Please enter number of team of the event", true]
      },

      //   eventDate:{
      //         type:Object,
      //         required:["Please enter Date of the event",false]
      //   },

      //   startingTime :{
      //         type:Object,
      //         required:["Please enter Starting time of the event",false]
      //   },

      matchNo: { type: String, unique: true },

      teams: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
      }],

      coaches: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'coachProfile'
      }],

      rounds: [{
            roundNumber: String,
            pairs: [],
            winners: [{
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Team'
            }],
      }],


})


const createEvent = mongoose.model('createEvent', createEventSchema);
module.exports = createEvent;