const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // Use the current response status code if set, else default to 500
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Handle Mongoose "CastError" for invalid ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    res.status(404);
    return res.json({
      message: 'Resource not found',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  }

  res.status(statusCode).json({
    message: err.message || 'An unknown error occurred',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
