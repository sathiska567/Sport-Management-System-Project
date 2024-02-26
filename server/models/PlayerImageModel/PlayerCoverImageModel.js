const mongoose = require('mongoose');

const playerCoverImageSchema = new mongoose.Schema({
        playerId: {
                type: String,
                //        required:["Player name is Required",true]
        },

        PlayerCoverImageSecureLink: {
                type: String,
        },

        PlayerCoverImageLink: {
                type: String,
        },
})

const PlayerCoverImage = mongoose.model('PlayerCoverImage', playerCoverImageSchema);
module.exports = PlayerCoverImage;