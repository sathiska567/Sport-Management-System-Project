const express = require("express");
const { CoachSearchController } = require("../../controllers/CoachSearchController/CoachSearchController");
const router = express.Router();


// FILTER COACHES
router.post("/filterCoaches",CoachSearchController)


module.exports = router;