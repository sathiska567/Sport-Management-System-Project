const express = require("express")
const { GetCoachCreatedTeamController } = require("../../controllers/GetCoachCreatedTeamController/GetCoachCreatedTeamController")
const router = express.Router()


// Get Created Team
router.get("/get-created-team",GetCoachCreatedTeamController)




module.exports = router