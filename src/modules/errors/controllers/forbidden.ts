import { Request, Response, NextFunction } from "express";

const boom = require("@hapi/boom");

exports.forbidden = (req: Request, res: Response, next: NextFunction) => {
  next(boom.forbidden());
};
