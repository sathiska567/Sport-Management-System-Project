const express = require('express');
const router = express.Router();
const {geteventTab,updateeventTab,deleteventTab} = require("../../controllers/edtEventTab/EditEventTab");
//create data
//router.post("/do-create",createevent)

//get data
router.get("/get-createTab/:id",geteventTab)

//update data
router.put("/update-eventTab",updateeventTab)

//delete data
router.delete("/delete-eventTab",deleteventTab)




module.exports= router;