const express = require('express');
const router = express.Router();
const {createevent,getevent,updateevent,deletevent, getSingleEvent} = require("../../controllers/EditEventTableController/EditEventTableController");


//get data
router.get("/get-create/",getevent)

router.get("/get-single-create/:_id", getSingleEvent)

//update data
router.post("/update-event",updateevent)

//delete data
router.delete("/delete-event/:id",deletevent)




module.exports= router;