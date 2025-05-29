import express from "express"; // Importing the express module
import EmpRouter from "./Db_Employee_Router.js"; // Import the router from routes.js
import depRouter from "./Db_Department_Router.js";
import config from "./envconfig.js";
import dotenv from "dotenv"; // Import dotenv for environment variables
import swaggerUi from 'swagger-ui-express';
import { readFile } from "fs/promises"; // Import readFile for reading files asynchronously
import {authenticateJWT,authorizeAdmin} from "./middlewares/authMiddleware.js"; // Import authentication and authorization middlewares
import AuthRouter from "./Db_Auth_Router.js"; // Import the authentication router
dotenv.config(config); // Load environment variables from .env file
const app = express(); // application object

const swaggerDoc = JSON.parse(
  await readFile(new URL('./swagger-output.json', import.meta.url))
);

// custoom middle ware to log requests
// app.use((req, res, next) => { 
//   console.log(`${req.method} request for '${req.url}'`);
//   if(req.method === 'GET' && req.url === '/') {
//     return res.status(200).json({
//       message: "Welcome to the Employee Management System API",
//       version: "1.0.0",
//     });
//   }
//   next(); // Call the next middleware in the stack
// });

app.use(express.json()); // Middleware to parse JSON request bodies
//app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(AuthRouter);
// Define a route
// add Auth and Authorization middlewares here
app.use(authenticateJWT);
app.use(authorizeAdmin);
app.use(EmpRouter); // Use the imported router for handling routes
app.use(depRouter);

// Start the server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});