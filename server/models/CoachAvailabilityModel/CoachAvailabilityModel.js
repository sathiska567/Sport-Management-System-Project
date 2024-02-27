const mongoose = require('mongoose');

const CoachAvailabilitySchema = new mongoose.Schema({
      eventId:{
        type:String,
      } ,

      coachId:{
        type:String,
      },

      availability:{
        type:Boolean
      }


})

const CoachAvailability = mongoose.model('CoachAvailability', CoachAvailabilitySchema);

module.exports = CoachAvailability;