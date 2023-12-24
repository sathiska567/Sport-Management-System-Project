const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware");
const { getAllDetailsController, handleStatusController } = require("../controllers/adminController");


// GET ALL APPLYING POSITION USERS DETAILS
router.get("/get-all-details",getAllDetailsController)


// HANDLE APPROVE STATUS
router.post("/handle-status",handleStatusController)




module.exports = router;