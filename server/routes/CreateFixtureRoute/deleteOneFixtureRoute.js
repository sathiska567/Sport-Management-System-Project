const express = require('express');
const { deleteFixtureController } = require('../../controllers/CreateFixtureController/deleteOneFixtureController');

const router = express.Router();

// HANLDE FIXTURE DELETE CONTROLLER || POST
router.post("/delete-fixture",deleteFixtureController)



module.exports = router;