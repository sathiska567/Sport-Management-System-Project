// db.js

const mongoose = require('mongoose');
const { connectDB } = require('../db/dbConfig');

const initDatabase = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = initDatabase;
