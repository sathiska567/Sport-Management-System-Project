const express = require("express");
const { GetOnlyEventOrganizerController } = require("../../controllers/GetOnlyEventOrganizerController/GetOnlyEventOrganizerController");
const router = express.Router();


// Get Only Event Organizer
router.get("/details",GetOnlyEventOrganizerController)



module.exports = router;