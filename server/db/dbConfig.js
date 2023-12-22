// db/dbConfig.js

const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://aathik:789@cluster0.w2q6z29.mongodb.net/SMS?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
  } catch (error) {
    throw error;
  }
};

module.exports = { connectDB };
