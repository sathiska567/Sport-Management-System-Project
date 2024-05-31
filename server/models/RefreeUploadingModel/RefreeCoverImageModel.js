const mongoose = require('mongoose');

const RefreeCoverImageSchema = new mongoose.Schema({
    RefreeId: {
                type: String,
             
        },

        RefreeCoverImageSecureLink: {
                type: String,
        },

        RefreeCoverImageLink: {
                type: String,
        },
})

const RefreeCoverImage = mongoose.model('RefreeCoverImageUpdated', RefreeCoverImageSchema);
module.exports = RefreeCoverImage;