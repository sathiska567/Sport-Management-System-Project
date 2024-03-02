const express = require('express');
const router = express.Router();
const {createeventform,geteventform,updateeventform,deleteeventform} = require("../../controllers/CreateEventTableController/CreateEventTableController");

//create data
router.post("/do-create",createeventform)

//get data
router.get("/get-create",geteventform)

//update data
router.put("/update-event",updateeventform)

//delete data
router.delete("/delete-event",deleteeventform)






module.exports = router;