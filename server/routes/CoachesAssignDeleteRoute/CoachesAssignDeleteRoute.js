const express = require('express');
const router = express.Router();
const { createcoachesAssign,getCoaches,changeCoachesStatus,deleteCoachesStatus } = require("../../controllers/CoachesAssignDeleteController/CoachesAssignDeleteController");

// DO ASSIGN
router.post("/create-coachesassign", createcoachesAssign)

// GET ASSIGN MEMBERS
router.get("/get-coachesassignee", getCoaches)

// CHANGE STATUS
router.post("/change-coachesstatus", changeCoachesStatus)

// DELETE ASSIGNEE
router.post("/delete-coachesstatus", deleteCoachesStatus)

module.exports = router;