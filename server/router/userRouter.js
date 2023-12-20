const express = require("express");
const {loginController,registerController,applyController ,currentUserController,allUserController, getAllNotificationController} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

//Set routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);


// APPLY DOCTOR || POST
router.post("/apply-position",applyController)


// GET CURRENT USER || GET
router.get("/current-user",authMiddleware , currentUserController)

// GET ALL USER || GET
router.get("/all-user", allUserController)


// Notification Doctor || POST
router.get("/get-all-notification",authMiddleware, getAllNotificationController)





module.exports = router;