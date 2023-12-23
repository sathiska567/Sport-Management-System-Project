// controllers/adminController.js

const bcrypt = require('bcrypt');
const { registerUser } = require('../services/userService');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

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

module.exports = { register, login, authenticateToken, userDashboard };
