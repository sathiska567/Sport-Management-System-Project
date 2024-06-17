const mongoose = require('mongoose');

const RefereeAvailabilitySchema = new mongoose.Schema({
      eventId:{
        type:String,
      } ,

      RefereeId:{
        type:String,
      },

      availability:{
        type:Boolean
      }


})

const RefereeAvailability = mongoose.model('RefereeAvailability', RefereeAvailabilitySchema);

module.exports = RefereeAvailability;