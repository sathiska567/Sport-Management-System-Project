const express = require('express');
const router = express.Router();
const {sreachPlayerProfile,getSearchPlayerProfile} = require("../../controllers/PlayerSearchProfileController/PlayerSearchProfileController");

// DO ASSIGN
router.post("/create-search-player-profile", sreachPlayerProfile)

// GET ASSIGN MEMBERS
router.get("/get-search-player-profile", getSearchPlayerProfile)



module.exports = router;