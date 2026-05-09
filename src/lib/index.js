// const {DB_URI, PORT} = require("./constants");



// module.exports = {
//   DB_URI,
//   PORT
// }
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI  // Make sure this is MONGO_URI, not DB_URI
};