const express = require("express")
const { eventDetailsForm } = require("../../controllers/EventDetailsFormController/EventDetailsFormController")

const router = express.Router()



// CREATE EVENT DETAILS FORM ROUTE || POST
router.post("/createEventDetailsForm",eventDetailsForm)






module.exports = router