// models/UserModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  isAdmin : {
    type : Boolean,
    default : false
 }, 
 
 isEventOrganizer:{
  type:Boolean,
  default:false
},

isCoach:{
  type:Boolean,
  default:false
},

isPlayer:{
  type:Boolean,
  default:false
},

isReferee:{
  type:Boolean,
  default:false
},
 
notification : {
  type : Array,
  default : []
},

seennotification : {
  type : Array,
  default : []
},

messages : {
  type : Array,
  default : []
},

otp: { 
  type: Number, 
  required: false

},

availability:{
  type:Boolean
}



});

const User = mongoose.model('User', userSchema);

module.exports = User;
