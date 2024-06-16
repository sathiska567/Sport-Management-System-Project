const express = require("express");
const { GetOnlyCoachController, GetEventAvailableCoachesController, GetOnlyCoachesPaginationController } = require("../../controllers/GetOnlyCoachController/GetOnlyCoachController");
const router = express.Router();


// Get Only Coaches
router.get("/details",GetOnlyCoachController)


// Get Event Assign Coaches
router.post("/assign",GetEventAvailableCoachesController)

// pagination
router.post("/pagination",GetOnlyCoachesPaginationController)

module.exports = router;