const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/myapp";

module.exports = {
  PORT,
  DB_URI,
};
