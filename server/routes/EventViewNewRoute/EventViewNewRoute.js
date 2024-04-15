const express = require('express');
const router = express.Router();
const { assignEventCoachesAndPlayers,getEventCoachesAndPlayers} = require("../../controllers/EventViewNewController/EventViewNewController");

// DO ASSIGN
router.post("/do-assign-Event-coachAndPlayer", assignEventCoachesAndPlayers)

// GET ASSIGN MEMBERS
router.get("/get-assignee-Event-CoachesAndPlayers", getEventCoachesAndPlayers)



module.exports = router;