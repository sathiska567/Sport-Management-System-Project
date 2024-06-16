const express = require('express');
const {coachReviewCreateController,getOverrallReviewController, searchReviewController} = require('../../controllers/CoachReviewController/CoachReviewControll');

const router = express.Router();

// HANDLE REVIEW || POST
router.post("/create-review",coachReviewCreateController)

// GET OVERALL REVIEW COSIDERING INDIVIDUAL PLAYER
router.post("/get-overall-review",getOverrallReviewController)

// SEARCH REVIEW || POST
router.post("/search-review",searchReviewController)


module.exports = router;