const express = require('express');
const {coachReviewCreateController} = require('../../controllers/CoachReviewController/CoachReviewControll');

const router = express.Router();

// HANDLE REVIEW || POST
router.post("/create-review",coachReviewCreateController)


module.exports = router;