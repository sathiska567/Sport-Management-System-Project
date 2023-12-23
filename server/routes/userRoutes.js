// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const {loginController, registerController,getCurrentUserController,applyPositionController } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


//Set routes
//LOGIN || POST
router.post("/login", loginController);

// REGISTER ROUTES || POST
router.post('/register', registerController);

// GET CURRENT USER DETAILS
router.get('/getCurrentUser',authMiddleware,getCurrentUserController)

// APPLY POSITION || POST
router.post('/apply-position',applyPositionController)





module.exports = router;
