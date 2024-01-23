const express = require('express');
const { ApproveActorModelController } = require('../controllers/ApproveActorModelController');

const router = express.Router();


// Handle User model aprove request
router.post("/aprove-user-model",ApproveActorModelController)


module.exports = router;