const express = require('express');
const router = express.Router();
const {createevent,getevent,updateevent,deletevent} = require("../../controllers/EditEvent/EditEvent");
//create data
router.post("/do-create",createevent)

//get data
router.get("/get-create/:id",getevent)

//update data
router.put("/update-event",updateevent)

//delete data
router.delete("/delete-event",deletevent)




module.exports= router;