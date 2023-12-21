// db/dbConfig.js

const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://sasindusathiska:sportManagementSystem@cluster0.oph32oc.mongodb.net/SMS?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
  } catch (error) {
    throw error;
  }
};

module.exports = { connectDB };
