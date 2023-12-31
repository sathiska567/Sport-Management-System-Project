const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware");
const { getAllDetailsController, handleStatusController,updateDetailsController,deleteDetailsController } = require("../controllers/adminController");


// GET ALL APPLYING POSITION USERS DETAILS
router.get("/get-all-details",getAllDetailsController)


// HANDLE APPROVE STATUS
router.post("/handle-status",handleStatusController)

// UPDATE POSITION APPLYING USER DETAILS
router.patch("/update-details",updateDetailsController)


// DELETE POSITION APPLYING PLAYER DETAILS
router.delete("/delete-details",deleteDetailsController)




module.exports = router;