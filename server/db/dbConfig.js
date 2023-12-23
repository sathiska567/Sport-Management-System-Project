// db/dbConfig.js

const mongoose = require('mongoose');

require("dotenv").config(); // Load environment variables


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    throw error;
  }
};

module.exports = { connectDB };
