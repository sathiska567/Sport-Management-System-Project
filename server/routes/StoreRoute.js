const express = require('express');
const { storeSingleEliminareController } = require('../controllers/StoreController');

const router = express.Router();

// STORE SINGLE ELIMINATE DATA || POST
router.post("/store-data",storeSingleEliminareController)


module.exports = router;