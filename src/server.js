// This is the entry point for the application

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/index.js';
import {
  logger,
  swaggerDocs,
  initMetrics,
  register,
  limiter,
} from './config/index.js';

dotenv.config();
initMetrics();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rate limiting
app.use(limiter); 

// Error Handling 
app.use(errorHandler);

// API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Metrics scraping
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    next(err)
  }
});

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Tradeful API!');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
}
export default app;
