const express = require('express');
const { getCurrentPlayerReviewController } = require('../../controllers/CoachReviewController/getCurrentPlayerReviewController');

const router = express.Router();

router.post("/current-player-review",getCurrentPlayerReviewController)


module.exports = router;