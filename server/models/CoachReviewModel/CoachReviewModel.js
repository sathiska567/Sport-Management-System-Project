const mongoose = require('mongoose');

const CoachreviewSchema = new mongoose.Schema({
  battingReview:{
        type:Number,
  },
  bowlingReview:{
        type:Number,
  },
  fieldingReview:{
        type:Number,
  },
  overallReview:{
        type:Number,
  },

  comment:{
        type:String,
  },

  playerId:{
        type:String,
  },

  reviewGivenCoachId:{
      type:String,
  },
  reviewGivenCoachName:{
      type:String, 
  },

  reviewGivenCoachEmail:{
      type:String, 
  }

})

const reviewModel = mongoose.model('review', CoachreviewSchema);

module.exports = reviewModel;
