// services/UserService.js

const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const registerUser = async ({ username, email, password }) => {
  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new Error('Username or email already exists');
      console.log('already exist user');
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the User to the database
    await newUser.save();
    console.log('User registered!');
  } catch (error) {
    throw error;
    console.log('could not save User');
  }
};

module.exports = { registerUser };
