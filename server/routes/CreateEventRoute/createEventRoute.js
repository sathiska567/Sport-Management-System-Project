const express = require("express")
const { createEventController,getAllEventsController, AddCoachesToEventController, AddPaginationToGetEvent, AddRefereesToEventController, GetRefereeAddEventController, searchRefereeAddEventController } = require("../../controllers/CreateEventController/createEventController")

const router = express.Router()

// CREATE EVENT ROUTE || POST
router.post("/create-event",createEventController)


// CREATE EVENT ROUTE || POST
router.get("/get-all-events",getAllEventsController)


// Assign Coaches To Event || POST
router.post("/assignCoaches",AddCoachesToEventController)

// Assign Referee To Event || POST
router.post("/assignReferee",AddRefereesToEventController)

// Get Assign Referee Event || POST
router.post("/assignReferee-event",GetRefereeAddEventController)

// Get Search Referee Event || POST
router.post("/search-assignReferee-event",searchRefereeAddEventController)

// PAGINATION || POST
router.post("/pagination",AddPaginationToGetEvent)



module.exports = router