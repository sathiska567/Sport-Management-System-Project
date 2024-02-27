const express = require('express');
const {coachReviewCreateController,getOverrallReviewController} = require('../../controllers/CoachReviewController/CoachReviewControll');

const router = express.Router();

// HANDLE REVIEW || POST
router.post("/create-review",coachReviewCreateController)

// GET OVERALL REVIEW COSIDERING INDIVIDUAL PLAYER
router.get("/get-overall-review",getOverrallReviewController)


module.exports = router;