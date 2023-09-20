import { Request, Response, NextFunction } from "express";

const boom = require("@hapi/boom");

export const badImplementation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(boom.badImplementation());
};
