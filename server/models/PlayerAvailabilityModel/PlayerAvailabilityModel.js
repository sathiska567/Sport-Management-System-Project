const mongoose = require('mongoose');

const PlayerAvailabilitySchema = new mongoose.Schema({
      eventId:{
        type:String,
      } ,

      playerId:{
        type:String,
      },

      availability:{
        type:Boolean
      }


})

const PlayerAvailability = mongoose.model('PlayerAvailability', PlayerAvailabilitySchema);

module.exports = PlayerAvailability;