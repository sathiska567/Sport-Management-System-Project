// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const {loginController, registerController } = require('../controllers/userController');


//Set routes
//LOGIN || POST
router.post("/login", loginController);

// REGISTER ROUTES || POST
router.post('/register', registerController);


//router.post('/login', login);





module.exports = router;
