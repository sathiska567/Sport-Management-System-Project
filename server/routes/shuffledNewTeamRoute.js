const express = require('express');
const { shuffledNewTeamController,getShuffledNewTeamController } = require('../controllers/shuffledNewTeam');

const router = express.Router();

// SEND NEW SHUFFLED TEAM DATA || POST
router.post("/newTeam",shuffledNewTeamController)

// GET SHUFFLED NEW TEAM || GET
router.post("/newFixture",getShuffledNewTeamController)

module.exports = router;