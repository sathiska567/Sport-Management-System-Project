const express = require('express');
const { getAllCreatedFixtureController, deleteFixtureController,fixtureUpdateController,getCurrentCreatedFixtureController } = require('../controllers/UpdateFixtureController');

const router = express.Router();

// GET ALL CREATED FIXTURES || GET
router.get("/all-fixtures",getAllCreatedFixtureController)


// GET CURRENT UPDATED FIXTURE DETAILS || POST
router.post("/current-team",getCurrentCreatedFixtureController)


// DELETE CREATE FIXTURE || POST
router.post("/delete",deleteFixtureController)


// UPDATE FIXTURE || POST
router.post("/update",fixtureUpdateController)


module.exports = router;