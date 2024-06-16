const express = require("express")
const { createEventController,getAllEventsController, AddCoachesToEventController, AddPaginationToGetEvent } = require("../../controllers/CreateEventController/createEventController")

const router = express.Router()

// CREATE EVENT ROUTE || POST
router.post("/create-event",createEventController)


// CREATE EVENT ROUTE || POST
router.get("/get-all-events",getAllEventsController)


// Assign Coaches To Event || POST
router.post("/assignCoaches",AddCoachesToEventController)

// PAGINATION || POST
router.post("/pagination",AddPaginationToGetEvent)



module.exports = router