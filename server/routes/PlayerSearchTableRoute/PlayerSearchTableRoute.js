const express = require('express');
const router = express.Router();
const {getSearchPlayerTable} = require("../../controllers/PlayerSearchTableController/PlayerSearchTableController");



// GET ASSIGN MEMBERS
router.get("/get-search-player-profile", getSearchPlayerTable)



module.exports = router;