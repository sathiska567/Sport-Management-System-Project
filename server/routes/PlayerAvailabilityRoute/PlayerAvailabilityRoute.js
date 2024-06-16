const express = require("express");
const { PlayerAvailabilityController, getEventAvailablePlayersController } = require("../../controllers/PlayerAvailabilityController/PlayerAvailabilityController");

const router = express.Router();


// POST PLAYER AVAILABILITY || POST
router.post("/save-player-availability",PlayerAvailabilityController)


// POST PLAYER AVAILABILITY || POST
router.post("/getEventPlayer",getEventAvailablePlayersController)


module.exports = router;