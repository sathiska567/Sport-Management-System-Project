const express = require('express');
const { RefreeProfileController,RefreeCoverImageUploadController,RefreeProfileUploadController, RefreeReportUploadController  } = require('../../controllers/RefreeProfileController/RefreeProfileController');

const router = express.Router();

const expressFormidable = require('express-formidable');


// Refree Details
router.post("/Refree-profile",RefreeProfileController)

// Refree Profile image
router.post("/Refree-profile-image-upload",expressFormidable({maxFileSize:5*1024*1024}), RefreeProfileUploadController);

// Refree Cover Image
router.post("/Refree-cover-image-upload",expressFormidable({maxFileSize:5*1024*1024}), RefreeCoverImageUploadController)

// Refree PDF Upload 

router.post("/Refree-report-upload",expressFormidable({maxFileSize:5*1024*1024}), RefreeReportUploadController)


module.exports = router;