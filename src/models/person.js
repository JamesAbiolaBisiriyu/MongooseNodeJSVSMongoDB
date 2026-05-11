const mongoose = require('mongoose');

// Define the Person schema using Mongoose schema types and simple validators
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // name is required
  age: { type: Number }, // age is a number
  favoriteFoods: { type: [String], default: [] } // array of strings
});

// Create and export the Person model
module.exports = mongoose.model('Person', personSchema);
