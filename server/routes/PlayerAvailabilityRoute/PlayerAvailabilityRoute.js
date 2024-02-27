const express = require("express");
const { PlayerAvailabilityController } = require("../../controllers/PlayerAvailabilityController/PlayerAvailabilityController");

const router = express.Router();


// POST PLAYER AVAILABILITY || POST
router.post("/save-player-availability",PlayerAvailabilityController)


module.exports = router;