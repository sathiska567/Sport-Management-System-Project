const mongoose = require("mongoose")

const palyerSchema = new mongoose.Schema({

FirstName : {
     type : String,
//      require : [true,"First name is required"]

  },

LastName : {
     type : String,
//      require : [true,"Last name is required"]

  },

  Email:{
        type :String,
      //   require : [true,"Email is required"]
  },

  Age:{
        type :Number,
      //   require : [true,"Age is required"]
  },

  Experience:{
        type :String,
      //   require : [true,"Experience is required"]
  },

  Distric:{
        type :String,
      //   require : [true,"Distric is required"]
  },

  UserRole:{
        type :String,
      //   require : [true,"UserRole is required"]
  },
  catagory:{
        type :String,
      //   require : [true,"UserRole is required"]
  },

  status : {
      type:String,
      default :'pending'   
     },

})


const PlayerModel = mongoose.model("Player",palyerSchema)

module.exports = PlayerModel;