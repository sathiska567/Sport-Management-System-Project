const express = require('express');
const { EoProfileController , EoProfileUploadController, EoCoverImageUploadController, EoReportUploadController  } = require('../../controllers/EOProfileNewController/EoProfileNewController');

const router = express.Router();

const expressFormidable = require('express-formidable');


// Event Organizer Details
router.post("/Eo-profile",EoProfileController)

// Event Organizer Profile image
router.post("/Eo-profile-image-upload",expressFormidable({maxFileSize:5*1024*1024}), EoProfileUploadController);

// Event Organizer Cover Image
router.post("/Eo-cover-image-upload",expressFormidable({maxFileSize:5*1024*1024}), EoCoverImageUploadController)

// Event Organizer PDF Upload 

router.post("/Eo-report-upload",expressFormidable({maxFileSize:5*1024*1024}), EoReportUploadController)


module.exports = router;