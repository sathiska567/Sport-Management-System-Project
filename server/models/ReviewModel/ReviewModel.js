const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
 review:{
   type:String,
   default:"",
 }

})

const reviewModel = mongoose.model('review',reviewSchema);

module.exports = reviewModel;