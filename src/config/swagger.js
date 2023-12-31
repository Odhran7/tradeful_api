// This is the config file for Swagger

import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Tradeful API',
        version: '1.0.0',
        description: 'API for connecting homeowners with tradespeople',
        contact: {
          name: 'API Support',
          url: 'http://www.tradeful.com/support',
          email: 'support@tradeful.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
    },
    apis: ['./src/routes/**/*.js'],
  };
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;