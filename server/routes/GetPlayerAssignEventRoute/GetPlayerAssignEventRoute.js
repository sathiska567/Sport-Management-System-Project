const express = require("express");
const { GetPlayerAssignEventController } = require("../../controllers/GetPlayerAssignEventController/GetPlayerAssignEventController");
const router = express.Router();


// GET PLAYER ASSIGN EVENT ROUTE
router.post("/getPlayerAssignEvent",GetPlayerAssignEventController)



module.exports = router;