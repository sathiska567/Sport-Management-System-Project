const mongoose = require('mongoose');

const playerMedicalReportSchema = new mongoose.Schema({
        playerId: {
                type: String,
                //        required:["Player name is Required",true]
        },

        PlayermedicalReportSecureLink: {
                type: String,
        },

        PlayerMedicalReportLink: {
                type: String,
        },
})

const PlayerMedicalReport = mongoose.model('PlayermedicalReport', playerMedicalReportSchema);
module.exports = PlayerMedicalReport;