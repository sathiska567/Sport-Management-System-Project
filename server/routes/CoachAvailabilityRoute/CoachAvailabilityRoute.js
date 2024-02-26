const express = require("express")
const { coachAvailabilityController } = require("../../controllers/coachAvailabilityController/coachAvailabilityController")

const router = express.Router()

// SAVE COACH AVAILABILITY || POST
router.post("/save-coach-availability",coachAvailabilityController)


module.exports = router