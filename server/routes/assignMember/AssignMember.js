const express = require('express');
const router = express.Router();
const { assignMember, getMember, changeStatus, deleteStatus } = require("../../controllers/assignMember/AssignMmber");

// DO ASSIGN
router.post("/do-assign", assignMember)

// GET ASSIGN MEMBERS
router.get("/get-assignee", getMember)

// CHANGE STATUS
router.post("/change-status", changeStatus)

// DELETE ASSIGNEE
router.post("/delete-status", deleteStatus)

module.exports = router;