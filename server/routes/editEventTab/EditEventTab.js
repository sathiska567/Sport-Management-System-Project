const express = require('express');
const router = express.Router();
const {geteventTab,updateeventTab,deleteventTab, geteventTabs} = require("../../controllers/edtEventTab/EditEventTab");
//create data
//router.post("/do-create",createevent)

//get data
router.get("/get-createTab/:id",geteventTab)

//get all data
router.get("/get-createTab", geteventTabs)

//update data
router.put("/update-eventTab",updateeventTab)

//delete data
router.delete("/delete-eventTab",deleteventTab)




module.exports= router;