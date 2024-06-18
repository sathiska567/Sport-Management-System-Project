const express = require("express")
const { RefereeAvailabilityController, EventAvailableRefereeController } = require("../../controllers/RefereeAvailabilityController/RefereeAvailabilityController")

const router = express.Router()

// SAVE COACH AVAILABILITY || POST
router.post("/save-referee-availability",RefereeAvailabilityController)


// EVENT AVAILABLE REFEREE || POST
router.post("/event-available-referee",EventAvailableRefereeController)


module.exports = router