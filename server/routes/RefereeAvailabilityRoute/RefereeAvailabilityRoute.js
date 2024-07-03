const express = require("express")
const { RefereeAvailabilityController, EventAvailableRefereeController, RestrictAssignRefereeController } = require("../../controllers/RefereeAvailabilityController/RefereeAvailabilityController")

const router = express.Router()

// SAVE COACH AVAILABILITY || POST
router.post("/save-referee-availability",RefereeAvailabilityController)


// EVENT AVAILABLE REFEREE || POST
router.post("/event-available-referee",EventAvailableRefereeController)


// restrict Assign Referees
router.post("/restrictAssignReferees",RestrictAssignRefereeController)


module.exports = router