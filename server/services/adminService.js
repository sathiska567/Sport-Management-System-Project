// services/adminService.js

const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerAdmin = async ({ username, email, password }) => {
  try {
    // Check if the username or email already exists
    const existingUser = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new Error('Username or email already exists');
      console.log('already exist user');
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    // Save the admin to the database
    await newAdmin.save();
    console.log('admin registered!');
  } catch (error) {
    throw error;
    console.log('could not save admin');
  }
};


//jwt login
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ username });

    if (!admin) {
      console.error('wrong username');
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      console.error('wrong password!');
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Handle successful login (you might want to generate a JWT token here)
    if (admin) {
      // Generate a JWT token
      const token = jwt.sign({ userId: admin._id, username: admin.username}, "secretKey", { expiresIn: '1h' });
      res.cookie("token", token);
      res.status(200).json({ message: 'Login successful', token: token});
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

const nextFunc = (req, res) => {
  console.log('Protected Route!');
  res.json({ message: 'This is a protected route!', user: req.user, token: req.user.token });
};

module.exports = { registerAdmin, loginAdmin, authenticateToken, nextFunc };
