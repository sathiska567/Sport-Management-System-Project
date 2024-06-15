const express = require('express');
const router = express.Router();
const { getAssignPlayers, changeAssignPlayersStatus, deleteAssignPlayersStatus } = require("../../controllers/AssignedPlayersTableController/AssignPlayersTableController");



// GET ASSIGN MEMBERS
router.get("/get-assignePlayers", getAssignPlayers)


// CHANGE STATUS
router.post("/change-assignPlayersstatus", changeAssignPlayersStatus)


// DELETE ASSIGNEE
router.post("/delete-assignPlayersstatus", deleteAssignPlayersStatus)



module.exports = router;