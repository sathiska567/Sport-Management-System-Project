const express = require("express")
const { PointTableForm, GetPointTableFormController } = require("../../controllers/PointTableFormController/PointTableFormController")

const router = express.Router()



// CREATE EVENT DETAILS FORM ROUTE || POST
router.post("/createPointTableForm",PointTableForm)

// GET ALL CREATE POINT TABLE FORM ROUTE || GET
router.get("/getAllPointTableForm",GetPointTableFormController)






module.exports = router