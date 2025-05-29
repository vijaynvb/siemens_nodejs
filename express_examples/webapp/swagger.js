import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv'; // Import dotenv for environment variables
dotenv.config(); // Load environment variables from .env file
const doc = {
  info: {
    title: 'REST API',
    description: 'Description'
  },
  host: `localhost:${process.env.PORT}`, // Use the port from environment variables
  basePath: '/',
  schemes: ['http'], // or ['https'] if using HTTPS
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your bearer token in the format **Bearer &lt;token&gt;**',
    },
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, endpointsFiles, doc);