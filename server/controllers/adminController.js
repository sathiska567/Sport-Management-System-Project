// controllers/adminController.js

const bcrypt = require('bcrypt');
const { registerAdmin, loginAdmin, authenticateToken, nextFunc } = require('../services/adminService');
const Admin = require('../models/adminModel');
const { route } = require('../routes/adminRoutes');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Register the user (including checking for existence and password hashing)
    await registerAdmin({ username, email, password });

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(400).json({ message: error.message });
  }
};


const login = loginAdmin;




module.exports = { register, login, nextFunc, authenticateToken };
