const express = require('express');
const { shuffledNewTeamController } = require('../controllers/shuffledNewTeam');

const router = express.Router();

// SEND NEW SHUFFLED TEAM DATA || POST
router.post("/newTeam",shuffledNewTeamController)

module.exports = router;