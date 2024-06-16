const express = require('express');
const { getPlayerDetailsController, playerPaginationController } = require('../../controllers/GetAllPlayerController/getAllPlayerController');

const router = express.Router();

// GET ONLY PLAYER DETAILS
router.get("/player-details",getPlayerDetailsController)

// Player PAGINATION || POAT
router.post("/player-pagination",playerPaginationController)


module.exports = router;