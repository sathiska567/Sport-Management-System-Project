// db/dbConfig.js

const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://ravishan:Pass123@cluster0.zmi2r0z.mongodb.net/userModel";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
  } catch (error) {
    throw error;
  }
};

module.exports = { connectDB };
