import { Request, Response, NextFunction } from "express";

const boom = require("@hapi/boom");

export const forbidden = (req: Request, res: Response, next: NextFunction) => {
  next(boom.forbidden());
};
