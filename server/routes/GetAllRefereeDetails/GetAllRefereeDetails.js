const express = require('express');
const { GetAllRefereeController } = require('../../controllers/GetAllRefereeController/GetAllRefereeController');

const router = express.Router();

// GET ONLY PLAYER DETAILS
router.get("/referee-details",GetAllRefereeController)


module.exports = router;