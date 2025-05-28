import express from "express"; // Importing the express module
import EmpRouter from "./Employee_Routes.js"; // Import the router from routes.js
import config from "./envconfig.js";
import dotenv from "dotenv"; // Import dotenv for environment variables
dotenv.config(config); // Load environment variables from .env file
const app = express(); // application object

app.use(express.json()); // Middleware to parse JSON request bodies
// Define a route
app.use(EmpRouter); // Use the imported router for handling routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});