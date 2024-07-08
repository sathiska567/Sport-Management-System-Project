const express = require("express")
const { PlayerDetailsForm } = require("../../controllers/PlayerDetailsFormController/PlayerDetailsController")

const router = express.Router()







// CREATE EVENT DETAILS FORM ROUTE || POST
router.post("/playerDetailsForm",PlayerDetailsForm)






module.exports = router