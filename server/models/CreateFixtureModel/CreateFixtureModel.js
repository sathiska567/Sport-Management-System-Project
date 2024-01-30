const mongoose = require('mongoose');   

const createFixtureSchema = new mongoose.Schema({
        nameOfTheEvent:{
          type:String,
          required:[true ,'Event Name is required']
        },

        location:{
          type:String,
          required:[true ,'Location is required']
        },

        // numberOfTeams:{
        //   type:String,
        //   required:[true ,'Number of team is required']
        // },

        nameOfTheTeam:{
           type:Array,
           required:[true ,'Team Name is required']
        },

        // eventDate:{
        //   type:String,
        //   required:[true ,'Event Date is required']
        // },

        // startingTime:{
        //   type:String,
        //   required:[true ,'Starting time is required']
        // },
})


const createFixtureModel = mongoose.model('createFixtureModel',createFixtureSchema);

module.exports = createFixtureModel;