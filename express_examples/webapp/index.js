import express from "express"; // Importing the express module
import EmpRouter from "./Employee_Routes.js"; // Import the router from routes.js
import depRouter from "./Department_Router.js";
import AuthRouter from "./authRouter.js";
import UserRouter from "./userRouter.js";
import config from "./envconfig.js";
import dotenv from "dotenv"; // Import dotenv for environment variables
import swaggerUi from 'swagger-ui-express';
import { readFile } from "fs/promises"; // Import readFile for reading files asynchronously
dotenv.config(config); // Load environment variables from .env file
const app = express(); // application object

const swaggerDoc = JSON.parse(
  await readFile(new URL('./swagger-output.json', import.meta.url))
);

app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// Define a route
app.use(AuthRouter); // Use the authentication router
app.use(UserRouter); // Use the user router
app.use(EmpRouter); // Use the imported router for handling routes
app.use(depRouter);

// Start the server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});