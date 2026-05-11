const express = require("express");
const app = express();

// Lightweight HTTP routes used to confirm the server is running.
app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

// Simple example route that returns a static list of users.
app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  res.json({ message: "get all users successfully", users });
});

module.exports = app;
