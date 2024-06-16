const express = require("express");
const { GetOnlyCoachController, GetEventAvailableCoachesController } = require("../../controllers/GetOnlyCoachController/GetOnlyCoachController");
const router = express.Router();


// Get Only Coaches
router.get("/details",GetOnlyCoachController)


// Get Event Assign Coaches
router.post("/assign",GetEventAvailableCoachesController)



module.exports = router;