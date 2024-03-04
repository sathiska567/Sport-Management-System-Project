const express = require('express');
const { eventOrganizerProfileController, eventOrganizerProfileUploadController,eventOrganizerCoverImageUploadController,eventOrganizerMedicalReportUploadController } = require('../../controllers/EventOrganizerProfileController/EventOrganizerProfileController');

const router = express.Router();

const expressFormidable = require('express-formidable');


// POST eventOrganizer PROFILE DETAILS
router.post("/eventOrganizer-profile",eventOrganizerProfileController)

// eventOrganizer PROFILE IMAGE CLOUDINARY UPLOAD
router.post("/eventOrganizer-profile-image-upload",expressFormidable({maxFileSize:5*1024*1024}), eventOrganizerProfileUploadController);

// eventOrganizer COVER IMAGE UPLOAD CONTROLLER
router.post("/eventOrganizer-cover-image-upload",expressFormidable({maxFileSize:5*1024*1024}), eventOrganizerCoverImageUploadController)


module.exports = router;