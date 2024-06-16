const express = require("express");
const { GetOnlyTeamManagersController, GetOnlyTMPaginationController } = require("../../controllers/GetOnlyTeamManagersController/GetOnlyTeamManagersController");
const router = express.Router();


// Get Only TM
router.get("/details",GetOnlyTeamManagersController)


// Get Only TM
router.post("/pagination",GetOnlyTMPaginationController)



module.exports = router;