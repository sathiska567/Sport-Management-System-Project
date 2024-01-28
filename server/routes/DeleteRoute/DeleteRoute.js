const express = require('express');
const { deleteTeamController } = require('../../controllers/DeleteController/DeleteController');

const router = express.Router();

// HANLDE TEAM DELETE CONTROLLER
router.post("/delte-team",deleteTeamController)


module.exports = router;
