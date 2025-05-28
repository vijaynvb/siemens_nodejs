import express from "express"; // Importing the express module
import router from "./routes.js"; // Import the router from routes.js
const app = express(); // application object

// Define a route
app.use(router); // Use the imported router for handling routes

// Start the server
//const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});