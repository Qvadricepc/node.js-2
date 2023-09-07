const errorHandler = (error, req, res, next) => {
  if (error.isBoom) {
    res.status(error.output.statusCode).send(error.output.payload);
  } else {
    res.status(500).send("Internal Server Error");
  }

  next();
};

module.exports = errorHandler;
