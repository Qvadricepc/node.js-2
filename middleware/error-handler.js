const errorHandler = (error, req, res, next) => {
  res.send(error.output.payload);
};

module.exports = errorHandler;
