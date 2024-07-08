const mongoose = require("mongoose");








const playerDetailsFormSchema = mongoose.Schema({









   
    playerName: {
        type: String,
        required: [true, "Please enter name of the player"]
    },







    nameOfTheTeam: {
        type: String,
        required: [true, "Please enter name of the team"]
    },


    totalRuns: {
        type: Number,
        required: [true, "Please enter won matches"]
    },


    numberOfDissMiss: {
        type: Number,
        required: [true, "Please enter lost matches"]
    },









    totalRunsConceded: {
        type: Number,
        required: [true, "Please enter total runs of Each team"]
    },








    numberOfWickets: {
        type: Number,
        required: [true, "Please enter total overs for each team"]
    },







    


});















const PlayerDetailsFormModel = mongoose.model("playerDetailsForm", playerDetailsFormSchema);
module.exports = PlayerDetailsFormModel;