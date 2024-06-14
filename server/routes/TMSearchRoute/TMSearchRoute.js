const express = require("express");
const { TMSearchController } = require("../../controllers/TMSearchController/TMSearchController");
const router = express.Router();


// FILTER Team Manager
router.post("/filterTM",TMSearchController)


module.exports = router;