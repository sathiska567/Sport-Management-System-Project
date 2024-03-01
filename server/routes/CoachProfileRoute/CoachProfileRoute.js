const express = require('express');
const { coachProfileController, coachProfileUploadController,coachCoverImageUploadController,coachMedicalReportUploadController } = require('../../controllers/CoachProfileController/CoachProfileController');

const router = express.Router();

const expressFormidable = require('express-formidable');


// POST coach PROFILE DETAILS
router.post("/coach-profile",coachProfileController)

// coach PROFILE IMAGE CLOUDINARY UPLOAD
router.post("/coach-profile-image-upload",expressFormidable({maxFileSize:5*1024*1024}), coachProfileUploadController);

// coach COVER IMAGE UPLOAD CONTROLLER
router.post("/coach-cover-image-upload",expressFormidable({maxFileSize:5*1024*1024}), coachCoverImageUploadController)

// coach COVER IMAGE UPLOAD CONTROLLER
router.post("/coach-medical-report-upload",expressFormidable({maxFileSize:5*1024*1024}), coachMedicalReportUploadController)


module.exports = router;