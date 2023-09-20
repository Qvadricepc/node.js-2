import { Request, Response, NextFunction } from "express";

export const noCache = (req: Request, res: Response, next: NextFunction) => {
  res.set("Cache-Control", "no-store");
  next();
};
