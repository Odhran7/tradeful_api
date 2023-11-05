// This middleware handles errors
const errorHandler = app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message: err.message,
    });
  });

export default errorHandler;