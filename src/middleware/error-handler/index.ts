import { Request, Response, NextFunction } from "express";
import { Boom } from "@hapi/boom";

const errorHandler = (
  error: Boom,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error.isBoom) {
    res.status(error.output.statusCode).send(error.output.payload);
  } else {
    res.status(500).send("Internal Server Error");
  }

  next();
};

module.exports = errorHandler;
