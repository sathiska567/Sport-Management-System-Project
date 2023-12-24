// controllers/adminController.js

const bcrypt = require('bcrypt');
const { registerUser } = require('../services/userService');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {sendEmail} = require('../services/emailService');
const { response } = require('express');


const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Register the user (including checking for existence and password hashing)
    await registerUser({ username, email, password });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  //jwt
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
      console.error('wrong username');
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.error('wrong password!');
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Handle successful login (you might want to generate a JWT token here)
    if (user) {
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id, username: user.username }, "secretKey", { expiresIn: '1h' });
      res.cookie("token", token);
      res.status(200).json({ message: 'Login successful', token: token });
      console.log('jwt success!! login success!!');

    } else {
      res.status(401).json({ message: 'Invalid login credentials' });
    }

  } catch (error) {
    console.log('Login error:', error.message, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Middleware to verify JWT token on protected routes
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;//req.headers.authorization && req.headers.authorization.split(' ')[1];
  console.log(token);

  if (!token) {
    console.log('No token available');
    return res.json('No token');
  }

  jwt.verify(token, "secretKey", (err, user) => {
    if (err) {
      console.log('wrong token');
      return res.json('wrong token');
    }

    req.user = user;
    next();
  });
};


const userDashboard = (req, res) => {
  console.log('Protected Route!');
  res.json({ message: 'This is a protected route!', user: req.user, token: req.user.token });
};




// Combined endpoint for checking email validity, saving otp, and sending otp
const sendOtp = async (req, res) => {
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
      const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '2m' });
      res.json({ message: 'OTP sent', token, user: { email: user.email, username: user.username } });

    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal serve error' });
  }
};


const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log(email, otp);

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });
    console.log(user.username);

    if (user && user.otp == otp) {
      // If OTP is correct, you can proceed to reset the password
      const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '3m' });

      //user.otp = undefined;
      //await user.save();
      //console.log('otp was reset');
      res.json({ message: 'OTP verified', token, user: { email: user.email, username: user.username } });
      console.log('OTP verified');

    } else {
      // If OTP is incorrect or user not found, return an error
      res.json({ error: 'Invalid OTP' });
      console.log('invalid otp');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  const {email, newPassword, token} = req.body;
  try {
    // Verify the token
    jwt.verify(token, 'your-secret-key', async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const user = await User.findOne({ email });

      if (user) {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: 'Password changed successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    });
  } catch(error){
    res.json({error:'Internal error'});
  }
}



module.exports = { register, login, authenticateToken, userDashboard , sendOtp, verifyOtp, resetPassword };
