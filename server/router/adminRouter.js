const express = require("express");
const {getAllRequestController,  changeAccountStatusController,} = require("../controller/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


//GET METHOD || DOCTORS
router.get("/getAllRequest", getAllRequestController);

//POST ACCOUNT STATUS
router.post("/changeAccountStatus" ,changeAccountStatusController );

module.exports = router;