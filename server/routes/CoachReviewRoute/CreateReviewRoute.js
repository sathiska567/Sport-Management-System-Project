const express = require('express');
const {coachReviewCreateController,getOverrallReviewController, searchReviewController, getOverrallReviewWithoutPaginationController, getReviewWithSortingController} = require('../../controllers/CoachReviewController/CoachReviewControll');

const router = express.Router();

// HANDLE REVIEW || POST
router.post("/create-review",coachReviewCreateController)

// GET OVERALL REVIEW COSIDERING INDIVIDUAL PLAYER
router.post("/get-overall-review",getOverrallReviewController)

// SEARCH REVIEW || POST
router.post("/search-review",searchReviewController)

// get Overall review without pagination
router.get("/get-overall-review-without-pagination",getOverrallReviewWithoutPaginationController)

// get Review with Sorting
router.get("/get-review-with-sorting",getReviewWithSortingController)


module.exports = router;