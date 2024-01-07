const express = require('express');
const { SendOtpController, VerifyOtpController,ResetPasswordController } = require('../controllers/forgottenPasswordController');
const router = express.Router();


// FORGOTTEN PASSWORD ROUTE || POST
router.post('/forgot-password',SendOtpController)


// VERIFY OTP ROUTE || POST
router.post('/verify-otp',VerifyOtpController)

// VERIFY OTP ROUTE || POST
router.post('/reset-password',ResetPasswordController)



module.exports = router;