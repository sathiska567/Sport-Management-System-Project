const express = require('express');
const { playerProfileController, playerProfileUploadController } = require('../../controllers/PlayerProfileController/PlayerProfileController');

const router = express.Router();

const expressFormidable = require('express-formidable');


// POST PLAYER PROFILE DETAILS
router.post("/player-profile",playerProfileController)

// PLAYER PROFILE IMAGE CLOUDINARY UPLOAD
router.post("/player-profile-image-upload",expressFormidable({maxFileSize:5*1024*1024}), playerProfileUploadController);


module.exports = router;