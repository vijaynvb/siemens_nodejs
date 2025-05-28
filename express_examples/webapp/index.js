const express = require("express");
const app = express(); // application object

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
app.get("/about", (req, res) => {
  res.send("About Page");
});
app.get("/contact", (req, res) => {
  res.send("Contact Page");
});

// Start the server
//const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});