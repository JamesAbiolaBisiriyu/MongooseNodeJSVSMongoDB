require("dotenv").config();
const http = require("http");
const app = require("./app");
const httpServer = http.createServer(app);
const connectDB = require("./helpers/db-config");
const { PORT } = require("./lib");



// const PORT = 3000;

// httpServer.on("request", (req, res) => {
  
  
//   if (req.url === "/" && req.method === "GET") {
      
//      res.writeHead(200, { "Content-Type": "application/json" });
//      res.end(JSON.stringify({ message: "Hello, World!" }));
//   } else if (req.url === "/users" && req.method === "GET") {
//     const users = [
//       { id: 1, name: "Alice" },
//       { id: 2, name: "Bob" },
//       { id: 3, name: "Charlie" }
//     ];

//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({message: "get all users successfully", users}));
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Route Not Found" }));
//   }
// })


const startServer = async () => {
  try {
    await connectDB();  // Wait for MongoDB connection first
    httpServer.listen(PORT, () => {
      console.log(`server is live on port : ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);  // Exit if database connection fails
  }
};
startServer();