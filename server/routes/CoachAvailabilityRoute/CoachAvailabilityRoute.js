const express = require("express")
const { coachAvailabilityController, getCoachAvailabilityController, getEventAvailableCoachController } = require("../../controllers/CoachAvailabilityController/coachAvailabilityController")

const router = express.Router()

// SAVE COACH AVAILABILITY || POST
router.post("/save-coach-availability",coachAvailabilityController)


router.get("/get-available-coach",getCoachAvailabilityController)

router.get("/get-event-available-coach",getEventAvailableCoachController)


module.exports = router