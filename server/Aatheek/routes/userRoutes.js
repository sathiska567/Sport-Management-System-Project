// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, authenticateToken, userDashboard, sendOtp, verifyOtp, resetPassword } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', authenticateToken, userDashboard);

router.post('/get-otp', sendOtp);


// Endpoint to verify OTP and proceed to reset password
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);






module.exports = router;
