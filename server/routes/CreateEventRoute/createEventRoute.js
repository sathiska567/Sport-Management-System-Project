const express = require("express")
const { createEventController,getAllEventsController } = require("../../controllers/CreateEventController/createEventController")

const router = express.Router()

// CREATE EVENT ROUTE || POST
router.post("/create-event",createEventController)


// CREATE EVENT ROUTE || POST
router.get("/get-all-events",getAllEventsController)



module.exports = router