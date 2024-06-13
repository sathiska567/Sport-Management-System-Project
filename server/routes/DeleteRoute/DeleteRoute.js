const express = require('express');
const { deleteTeamController, getDeleteEventController } = require('../../controllers/DeleteController/DeleteController');

const router = express.Router();

// HANLDE TEAM DELETE CONTROLLER
router.post("/delte-team",deleteTeamController)

// get all deleted event
router.get("/get-deleted-event",getDeleteEventController)


module.exports = router;
