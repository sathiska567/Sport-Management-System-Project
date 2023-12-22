// controllers/adminController.js

const bcrypt = require('bcrypt');
const { registerUser } = require('../services/userService');
const User = require('../models/userModel');

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
  try {
    const { username, password } = req.body;

    // Check if the admin exists
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
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { register, login };
