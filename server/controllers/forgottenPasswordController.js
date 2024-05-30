const User = require('../models/userModel');
const { sendEmail } = require('../service/emailService');
const bcrypt = require("bcryptjs")


// Forgotten password controller
// Combined endpoint for checking email validity, saving otp, and sending otp
const SendOtpController = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });
    console.log(user);


    if (user) {
      // Generate a random 4-digit OTP
      const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
      console.log(resetCode);

      // Save the reset code in the database
      user.otp = resetCode;
      await user.save();
      console.log('otp saved')

      // Send the reset code to the user's email
      await sendEmail(email, resetCode);

      //     const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '2m' });

      //     res.json({ message: 'OTP sent', token, user: { email: user.email, username: user.username } });

      res.status(200).send({
        success: true,
        message: "OTP Generate adn Send successfull.please check your email",
        user
      })

    } else {
      res.status(400).send({
        success: false,
        message: "User not Found",

      })
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "OTP Generate adn Send Have an error.",
      error
    })
  }
};


const VerifyOtpController = async (req, res) => {1111
  const { email, otp } = req.body;
  console.log(email, otp);

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });
    console.log(user.username);

    if (user && user.otp == otp) {

      // If OTP is correct, you can proceed to reset the password
      //     const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '3m' });

      //user.otp = undefined;
      //await user.save();
      //console.log('otp was reset');

      //     res.json({ message: 'OTP verified', token, user: { email: user.email, username: user.username } });

      console.log('OTP verified');

      res.status(200).send({
        success: true,
        message: "OTP Verify Successfully.",
        user
      })

    } else {
      //     // If OTP is incorrect or user not found, return an error
      //     res.json({ error: 'Invalid OTP' });
      //     console.log('invalid otp');

      res.status(400).send({
        success: false,
        message: "OTP Verify Have Error.",
      })


    }
  } catch (error) {
    //   res.status(500).json({ error: 'Internal server error' });

    res.status(200).send({
      success: false,
      message: "Error occure in Forgotten Password Controller",
      error
    })

  }
};


const ResetPasswordController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      res.status(200).send({
        success: true,
        message: "Password changed successfully",
        user: { email: user.email, username: user.username },
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error in ResetPasswordController:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while resetting the password.",
      error: error.message,
    });
  }
};



module.exports = { SendOtpController, VerifyOtpController, ResetPasswordController };