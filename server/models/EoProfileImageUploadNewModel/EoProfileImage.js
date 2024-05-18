const mongoose = require('mongoose');

const EoProfileImageSchema = new mongoose.Schema({
        EoId: {
                type: String,
                
        },
        EoprofileImageSecureLink: {
                type: String,
        },

        EoprofileImageLink: {
                type: String,
        },

})

const EoProfileImage = mongoose.model('EoProfileImageUpdated', EoProfileImageSchema);
module.exports = EoProfileImage;