const mongoose = require('mongoose');

const playerProfileSchema = new mongoose.Schema({

   PlayerNo: { type: String, unique: true },
   Status: {
      type: String,
      default: 'pending'

   },
   teams: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
   }],

   matches: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match'
   }],
   playerName: {
      type: String,
      required: ["Player name is Required", true]
   },
   playerEmail: {
      type: String,
      required: ["Player email is Required", true]
   },
   playerDateOfBirth: {
      type: Object,
      required: ["Player Date Of Birth is Required", true]
   },
   playerAge: {
      type: Number,
      required: ["Player age is Required", true]
   },


})

const playerProfileModel = mongoose.model('playerProfile', playerProfileSchema);
module.exports = playerProfileModel;