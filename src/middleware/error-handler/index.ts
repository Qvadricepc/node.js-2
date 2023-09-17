import { Request, Response, NextFunction } from "express";
import { Boom } from "@hapi/boom";
import { loggerWinston } from "../../utils/loggers/logger-winston";

export const errorHandler = (
  error: Boom,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error.isBoom) {
    loggerWinston.error(error.output.payload.message);
    res.status(error.output.statusCode).send(error.output.payload);
  } else {
    res.status(500).send("Internal Server Error");
  }

  next();
};
