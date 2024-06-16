const express = require('express');
const router = express.Router();
const { getEventAssignPlayers,getSingleEvent } = require("../../controllers/DisplayAssignPlayersController/DisplayAssignPlayersController");


// GET ASSIGN MEMBERS
router.get("/get-playersassigne", getEventAssignPlayers)

//get single event
router.get("/get-single-event/:_id", getSingleEvent)


module.exports = router;