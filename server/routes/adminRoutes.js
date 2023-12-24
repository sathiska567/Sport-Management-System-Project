const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware");
const { getAllDetailsController } = require("../controllers/adminController");


// GET ALL APPLYING POSITION USERS DETAILS
router.get("/get-all-details",getAllDetailsController)




module.exports = router;