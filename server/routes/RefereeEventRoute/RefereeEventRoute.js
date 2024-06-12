const express = require("express");
const router = express.Router();

const {
  createRefereeEvent,
  getRefereeEvent,
  getRefereeEvents,
  updateRefereeEvent,
  deleteRefereeEvent,
} = require("../../controllers/RefereeEventController/RefereeEventController");


router.get("/get-all-referee-events", getRefereeEvents);
router.get("/get-referee-event/:id", getRefereeEvent);
router.post("/create-referee-event", createRefereeEvent);
router.put("/update-referee-event/:id", updateRefereeEvent);
router.delete("/delete-referee-event/:id", deleteRefereeEvent);

module.exports = router;