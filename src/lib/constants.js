// const dotenv = require("dotenv");

// // Load environment variables once for the whole app.
// dotenv.config();

// const PORT = process.env.PORT || 3000;
// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/myapp";

// module.exports = {
//   PORT,
//   MONGO_URI,
// };

// Default HTTP port for local development when PORT is not set in the environment.
const PORT = process.env.PORT || 3000;

// Database connection string loaded from the environment and shared across the app.
const CONN_STR = process.env.CONN_STR;

module.exports = {
  PORT,
  CONN_STR,
};
