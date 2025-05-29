import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

const doc = {
  info: {
    title: 'Employee Management System API',
    version: '1.0.0',
    description: 'API documentation for the Employee Management System'
  },
  host: `localhost:${process.env.PORT}`, // Replace with your host and port
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