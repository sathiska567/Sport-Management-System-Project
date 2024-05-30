const mongoose = require('mongoose');

const RefreeReportSchema = new mongoose.Schema({
    RefreeId: {
                type: String,
               
        },

        RefreeReportSecureLink: {
                type: String,
        },

        RefreeReportLink: {
                type: String,
        },
})

const RefreePDF= mongoose.model('RefreeReportUpdated', RefreeReportSchema);
module.exports = RefreePDF;