// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const {loginController, registerController,getCurrentUserController } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


//Set routes
//LOGIN || POST
router.post("/login", loginController);

// REGISTER ROUTES || POST
router.post('/register', registerController);

// GET CURRENT USER DETAILS
router.get('/getCurrentUser',authMiddleware,getCurrentUserController)


//router.post('/login', login);





module.exports = router;
