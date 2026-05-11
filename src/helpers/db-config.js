const mongoose = require("mongoose");
const { CONN_STR } = require("../lib");

// Centralized MongoDB connection helper so the rest of the app does not need to know connection details.
const connectDB = async () => {
  try {
    // Mongoose connects using the URI resolved from the shared config module.
    await mongoose.connect(CONN_STR);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = connectDB;
