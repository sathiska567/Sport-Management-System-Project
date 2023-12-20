const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  userId : {
      type : String,
  },

  firstName: {
    type: String,
    required: [true, "first Name is require"],
  },

  lastName: {
    type: String,
    required: [true, "last Name is require"],
  },

  phone: {
    type: String,
    required: [true, "phone is require"],
  },

  email: {
    type: String,
    required: [true, "email is require"],
  },

  website: {
    type: String,
  },

  address: {
     type: String,
     required: [true, "address is require"],
      },

  specialization: {
    type: String,
    required: [true, "specialization is require"],
  },

  experience: {
    type: String,
    required: [true, "experience is require"],
  },

  feesPerConsaltation: {
    type: Number,
    required: [true, "Fees Per Consaltation is require"],
  },

  status : {

     type:String,
     default :'pending'

  },

  timing: {
    type: Object,
    // required: [true, "work timing is require"],
  },


});

const playerModel = mongoose.model("playes", playerSchema);

module.exports = playerModel;