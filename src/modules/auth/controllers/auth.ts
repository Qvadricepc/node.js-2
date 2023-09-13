import { Request, Response, NextFunction } from "express";

exports.auth = async (req: Request, res: Response) => {
  return res.json({ message: "login" });
};
