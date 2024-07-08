const express = require('express');
const router = express.Router();
const { getPlayers } = require("../../controllers/PlayerPerformanceController/PlayerPerformanceController");



// GET ASSIGN MEMBERS
router.get("/get-players", getPlayers)


module.exports = router;