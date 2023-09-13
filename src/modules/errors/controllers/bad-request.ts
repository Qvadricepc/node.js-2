import { Request, Response, NextFunction } from "express";

const boom = require("@hapi/boom");

exports.badRequest = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.name) {
    return next(boom.badRequest());
  }
};
