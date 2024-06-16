const express = require('express');
const router = express.Router();
const { getPointTable } = require("../../controllers/PointTableCodeController/PointTableCodeController");




// GET ASSIGN MEMBERS
router.get("/get-pointTable", getPointTable)



module.exports = router;