const express = require('express');
const router = express.Router();
const { createMatchDetails, getMatchDetails } = require("../../controllers/MatchDetailsController/MatchDetailsController");

// DO ASSIGN
router.post("/create-match-details", createMatchDetails)

// GET ASSIGN MEMBERS
router.get("/get-match-details", getMatchDetails)



module.exports = router;