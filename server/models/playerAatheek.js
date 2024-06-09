const mongoose = require('mongoose')

const palyerSchema = new mongoose.Schema({
    playerId: {
        type: String,
        //        required:["Player name is Required",true]
    },
    playerName: {
        type: String,
        //required: ["Player name is Required", true]
    },
    Distric: {
        type: String,
        //require: [true, "Distric is required"]
    }
})

const playerModel = mongoose.model("Player(Aatheek)", palyerSchema);
module.exports = playerModel;