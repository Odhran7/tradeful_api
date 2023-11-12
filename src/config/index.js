// This file exports the configuration for the application.

import logger from './logger.js';
import swaggerDocs from './swagger.js';
import  { register, initMetrics } from './metrics.js';
import limiter from './limiter.js';
import dotenv from './envConfig.js';


export {
    logger,
    swaggerDocs,
    register,
    initMetrics,
    limiter,
    dotenv,
}