const express = require('express');
const { getPlayerDetailsController, playerPaginationController, getOnlySearchResultController } = require('../../controllers/GetAllPlayerController/getAllPlayerController');

const router = express.Router();

// GET ONLY PLAYER DETAILS
router.get("/player-details",getPlayerDetailsController)

// Player PAGINATION || POAT
router.post("/player-pagination",playerPaginationController)


// SEARCH PLAYER || POST
router.post("/search-player",getOnlySearchResultController)


module.exports = router;