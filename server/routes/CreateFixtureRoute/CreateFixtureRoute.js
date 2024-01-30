const express = require('express');
const { createFixtureController } = require('../../controllers/CreateFixtureController/CreateFixtureController');

// CREATE EXPRESS ROUTE
const router = express.Router();

// CREATE FIXTURE ROUTE || POST
router.post("/create-fixture",createFixtureController)

module.exports = router;