const mongoose = require('mongoose');

const playerImageSchema = new mongoose.Schema({
        playerId: {
                type: String,
                //        required:["Player name is Required",true]
        },
        PlayerprofileImageSecureLink: {
                type: String,
        },

        PlayerprofileImageLink: {
                type: String,
        },

        playerCoverImageLink: {
                type: String,
        },

        playerMedicalReportsLink: {
                type: String,
        }
})

const PlayerImage = mongoose.model('PlayerImage', playerImageSchema);
module.exports = PlayerImage;