const express = require("express");
const { GetOnlyTeamManagersController } = require("../../controllers/GetOnlyTeamManagersController/GetOnlyTeamManagersController");
const router = express.Router();


// Get Only Coaches
router.get("/details",GetOnlyTeamManagersController)



module.exports = router;