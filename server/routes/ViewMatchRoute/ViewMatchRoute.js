const express = require('express');
const router = express.Router();
const { createMatchDetails,getMatchDetails } = require("../../controllers/ViewMatchController/ViewMatchController")

// create match details
router.post("/create-match-details", createMatchDetails)

// get match details
router.get("/get-match-details", getMatchDetails)



module.exports = router;