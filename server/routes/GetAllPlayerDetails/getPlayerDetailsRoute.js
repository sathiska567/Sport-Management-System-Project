const express = require('express');
const { getPlayerDetailsController } = require('../../controllers/GetAllPlayerController/getAllPlayerController');

const router = express.Router();

// GET ONLY PLAYER DETAILS
router.get("/player-details",getPlayerDetailsController)


module.exports = router;