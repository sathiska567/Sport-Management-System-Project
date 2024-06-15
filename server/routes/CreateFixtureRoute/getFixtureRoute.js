const express = require('express');
const { getFixtureController, paginationFixture } = require('../../controllers/CreateFixtureController/getFixtureController');

// CREATE EXPRESS ROUTE
const router = express.Router();

// CREATE FIXTURE ROUTE || POST
router.get("/get-fixture",getFixtureController)


// pagination || POST
router.post("/pagination",paginationFixture)




module.exports = router;