const express = require('express');
const { getCurrentPlayerReviewController } = require('../../controllers/CoachReviewController/getCurrentPlayerReviewController');

const router = express.Router();

router.post("/details",getCurrentPlayerReviewController)


module.exports = router;