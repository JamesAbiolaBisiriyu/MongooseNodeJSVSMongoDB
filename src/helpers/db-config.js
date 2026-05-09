const mongoose = require("mongoose");
const { MONGO_URI } = require("../lib");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = connectDB;