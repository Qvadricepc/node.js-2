const errorHandler = (error, req, res, next) => {
  res.send(error);
};

module.exports = errorHandler;
