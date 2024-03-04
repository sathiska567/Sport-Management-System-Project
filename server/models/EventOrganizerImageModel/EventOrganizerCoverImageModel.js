const mongoose = require('mongoose');

const eventOrganizerCoverImageSchema = new mongoose.Schema({
        eventOrganizerId: {
                type: String,
                //        required:["eventOrganizer name is Required",true]
        },

        eventOrganizerCoverImageSecureLink: {
                type: String,
        },

        eventOrganizerCoverImageLink: {
                type: String,
        },
})

const eventOrganizerCoverImage = mongoose.model('eventOrganizerCoverImage', eventOrganizerCoverImageSchema);
module.exports = eventOrganizerCoverImage;