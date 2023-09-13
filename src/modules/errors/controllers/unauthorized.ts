import { Request, Response, NextFunction } from "express";

const boom = require("@hapi/boom");

exports.unAuthorized = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers["authorization"] !== "Bearer valid-token") {
    return next(boom.unauthorized());
  }
};
