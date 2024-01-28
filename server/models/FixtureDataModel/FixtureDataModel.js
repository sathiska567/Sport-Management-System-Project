const mongoose = require("mongoose")

const FixtureSchema = new mongoose.Schema({
      TeamName:{
        type:String,
      }  
})


const Fixture = mongoose.model("Fixture", FixtureSchema)

module.exports = Fixture;
