const express = require('express');
const { GetPlayerCatagoryController } = require('../../controllers/GetPlayerCatagoryController/GetPlayerCatagoryController');
const router = express.Router();


// Get Player Catagory
router.get("/category",GetPlayerCatagoryController)




module.exports = router