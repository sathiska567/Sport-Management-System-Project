const express = require('express');
const router = express.Router();
const { getAssignCoaches,changeAssignCoachesStatus,deleteAssignCoachesStatus } = require("../../controllers/AssignCoachesNewController/AssignCoachesNewController");



// GET ASSIGN MEMBERS
router.get("/get-assigneCoaches", getAssignCoaches)


// CHANGE STATUS
router.post("/change-assigncoachesstatus", changeAssignCoachesStatus)



// DELETE ASSIGNEE
router.post("/delete-assigncoachesstatus", deleteAssignCoachesStatus)



module.exports = router;