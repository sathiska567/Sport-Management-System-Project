const mongoose = require('mongoose');

const EoCoverImageSchema = new mongoose.Schema({
        EoId: {
                type: String,
             
        },

        EoCoverImageSecureLink: {
                type: String,
        },

        EoCoverImageLink: {
                type: String,
        },
})

const EoCoverImage = mongoose.model('EoCoverImageUpdated', EoCoverImageSchema);
module.exports = EoCoverImage;