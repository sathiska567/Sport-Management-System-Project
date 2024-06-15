const mongoose = require("mongoose");



const pointTableFormSchema = mongoose.Schema({




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


const PointTableFormModel = mongoose.model("PointTableForm", pointTableFormSchema);
module.exports = PointTableFormModel;