const express = require('express');
const { FixtureDataController,GetFixtureDataController } = require('../../controllers/FixtureController/FixtureController');

const router = express.Router();

// send data
router.post('/team',FixtureDataController)

// Get data
router.get('/get-team',GetFixtureDataController)

module.exports = router;