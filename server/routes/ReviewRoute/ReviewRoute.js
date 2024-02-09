const express = require('express');
const { reviewController } = require('../../controllers/ReviewController/ReviewController');

const router = express.Router();


// POST REVIEW RESPONSE TO THE BACKEND
router.post("/coach-review",reviewController)


module.exports = router;