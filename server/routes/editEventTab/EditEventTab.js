const express = require('express');
const router = express.Router();
const {geteventTab,updateeventTab,deleteventTab} = require("../../controllers/edtEventTab/EditEventTab");
//create data
//router.post("/do-create",createevent)

//get data
router.get("/get-create/:id",geteventTab)

//update data
router.put("/update-event",updateeventTab)

//delete data
router.delete("/delete-event",deleteventTab)




module.exports= router;