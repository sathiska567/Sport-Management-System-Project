const express = require('express');
const router = express.Router();
const { getEventHomePage } = require("../../controllers/EventTableHomePageController/EventTableHomePageController");


// GET ASSIGN MEMBERS
router.get("/get-coachesassigne", getEventHomePage)



module.exports = router;