const express = require('express');
const { deleteTeamController } = require('../controllers/deleteController');

const router = express.Router();

// HANLDE TEAM DELETE CONTROLLER
router.post("/delte-team",deleteTeamController)


module.exports = router;