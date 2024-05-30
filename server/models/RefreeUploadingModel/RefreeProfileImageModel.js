const mongoose = require('mongoose');

const RefreeProfileImageSchema = new mongoose.Schema({
    RefreeId: {
                type: String,
                
        },
        RefreeprofileImageSecureLink: {
                type: String,
        },

        RefreeprofileImageLink: {
                type: String,
        },

})

const RefreeProfileImage = mongoose.model('RefreeProfileImageUpdated', RefreeProfileImageSchema);
module.exports = RefreeProfileImage;