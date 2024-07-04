const express = require('express');
const { GetPlayerCatagoryController, GetPlayerPendingCatagoryController } = require('../../controllers/GetPlayerCatagoryController/GetPlayerCatagoryController');
const router = express.Router();


// Get Player Catagory
router.get("/category",GetPlayerCatagoryController)

// Get Player Catagory
router.get("/pending-category",GetPlayerPendingCatagoryController)




module.exports = router