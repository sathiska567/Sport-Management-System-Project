const mongoose = require('mongoose');

const coachMedicalReportSchema = new mongoose.Schema({
        coachId: {
                type: String,
                //        required:["coach name is Required",true]
        },

        coachmedicalReportSecureLink: {
                type: String,
        },

        coachMedicalReportLink: {
                type: String,
        },
})

const coachMedicalReport = mongoose.model('coachmedicalReport', coachMedicalReportSchema);
module.exports = coachMedicalReport;