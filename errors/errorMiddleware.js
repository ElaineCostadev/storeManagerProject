function errorMiddleware(err, _req, res, _next) {
  return res.status(err.status || 500).json({
      message: err.message,
  });
}

module.exports = errorMiddleware;
