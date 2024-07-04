
const express = require('express');
const { shuffledNewTeamController,getShuffledNewTeamController, getAllShuffleTeamController } = require('../../controllers/ShuffleNewTeam/ShuffleNewTeamController');

const router = express.Router();

// SEND NEW SHUFFLED TEAM DATA || POST
router.post("/newTeam",shuffledNewTeamController)

// GET SHUFFLED NEW TEAM || GET
router.post("/newFixture",getShuffledNewTeamController)

// GET ALL SHUFFLED NEW TEAM || GET
router.get("/get-all-shuffleTeam",getAllShuffleTeamController)

module.exports = router;