const express = require('express');
const router = express.Router();
const { assignEventCoaches,getEventCoaches } = require("../../controllers/AssignEventCoaches/AssignEventCoaches");

// DO ASSIGN
router.post("/do-assign-Event-Member", assignEventCoaches)

// GET ASSIGN MEMBERS
router.get("/get-assignee-Event-Member", getEventCoaches)



module.exports = router;