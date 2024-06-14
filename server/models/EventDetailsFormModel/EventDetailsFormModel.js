const mongoose = require("mongoose");



const eventDetailsFormSchema = mongoose.Schema({




    nameOfTheMatch: {
        type: String,
        required: [true, "Please enter name of the match"]
    },





    nameOfTheTeam: {
        type: String,
        required: [true, "Please enter name of the team"]
    },


    wonMatches: {
        type: Number,
        required: [true, "Please enter won matches"]
    },


    lostMatches: {
        type: Number,
        required: [true, "Please enter lost matches"]
    },




    totalRunsEachTeamMatches: {
        type: Number,
        required: [true, "Please enter total runs of Each team"]
    },




    totalOversEachTeam: {
        type: Number,
        required: [true, "Please enter total overs for each team"]
    },




    totalMarksForEachTeam: {
        type: Number,
        required: [true, "Please enter total marks get each team"]
    }



    


});


const EventDetailsFormModel = mongoose.model("EventDetailsForm", eventDetailsFormSchema);
module.exports = EventDetailsFormModel;