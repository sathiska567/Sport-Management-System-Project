const express = require("express")
const { PointTableForm } = require("../../controllers/PointTableFormController/PointTableFormController")

const router = express.Router()



// CREATE EVENT DETAILS FORM ROUTE || POST
router.post("/createPointTableForm",PointTableForm)






module.exports = router