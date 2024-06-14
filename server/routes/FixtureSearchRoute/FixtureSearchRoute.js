const express = require('express');
const { FixtureSearchController } = require('../../controllers/FixtureSearchController/FixtureSearchController');
const router = express.Router();

// get search data
router.post("/data",FixtureSearchController)



module.exports = router;