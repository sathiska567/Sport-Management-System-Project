const express = require('express');
const { getFixtureController } = require('../../controllers/CreateFixtureController/getFixtureController');

// CREATE EXPRESS ROUTE
const router = express.Router();

// CREATE FIXTURE ROUTE || POST
router.get("/get-fixture",getFixtureController)

module.exports = router;