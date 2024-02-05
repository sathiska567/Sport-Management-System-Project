const express = require("express")
const { createEventController } = require("../../controllers/CreateEventController/createEventController")

const router = express.Router()

// CREATE EVENT ROUTE || POST
router.post("/create-event",createEventController)



module.exports = router