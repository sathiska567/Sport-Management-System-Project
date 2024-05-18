const mongoose = require('mongoose');

const EoReportSchema = new mongoose.Schema({
        EoId: {
                type: String,
               
        },

        EoReportSecureLink: {
                type: String,
        },

        EoReportLink: {
                type: String,
        },
})

const EoPDF= mongoose.model('EoReportUpdated', EoReportSchema);
module.exports = EoPDF;