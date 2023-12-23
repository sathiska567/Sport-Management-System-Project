const mongoose = require("mongoose")

const palyerSchema = new mongoose.Schema({

  userId : {
     type : String,

  },

  userName:{
        type :String,
        required : true
  },

  experienced:{
        type :String,
        required : true
  },

  status : {
      type:String,
      default :'pending'
   
     },

})


const PlayerModel = mongoose.model("Player",palyerSchema)

module.exports = PlayerModel;