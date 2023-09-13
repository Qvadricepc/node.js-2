import { Request, Response, NextFunction } from "express";

const boom = require("@hapi/boom");

exports.badImplementation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(boom.badImplementation());
};
