const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
  ];

  res.json({ message: "get all users successfully", users });
});




module.exports = app;