const express = require("express");
const { GetOnlyCoachController } = require("../../controllers/GetOnlyCoachController/GetOnlyCoachController");
const router = express.Router();


// Get Only Coaches
router.get("/details",GetOnlyCoachController)



module.exports = router;