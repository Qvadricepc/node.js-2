const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      errorMessage: error.message || "Something went wrong",
    },
  });
};

module.exports = errorHandler;
