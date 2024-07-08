const express = require("express");
const { GetOnlyEventOrganizerController, GetSearchEOResultController } = require("../../controllers/GetOnlyEventOrganizerController/GetOnlyEventOrganizerController");
const router = express.Router();


// Get Only Event Organizer
router.get("/details",GetOnlyEventOrganizerController)


// get search EO result 
router.post("/search",GetSearchEOResultController)


module.exports = router;