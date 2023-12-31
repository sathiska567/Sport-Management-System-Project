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
 
notification : {
  type : Array,
  default : []
},

seennotification : {
  type : Array,
  default : []
},

otp: { 
  type: Number, 
  required: false

},



});

const User = mongoose.model('User', userSchema);

module.exports = User;
