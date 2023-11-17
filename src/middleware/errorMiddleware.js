// This middleware handles errors
import logger from '../config/logger.js'

const errorHandler = (err, req, res, next) => {
    logger.error(err.message, err)
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message: err.message,
    });
  };

export default errorHandler;