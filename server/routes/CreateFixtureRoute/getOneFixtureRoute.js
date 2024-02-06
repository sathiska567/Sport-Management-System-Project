const express = require('express');
const { getOneFixtureController } = require('../../controllers/CreateFixtureController/getOneFixtureController');

const router = express.Router();


// GET ONE FIXTURE DETAILS || POST
router.post("/get-one-fixture",getOneFixtureController)


module.exports = router;