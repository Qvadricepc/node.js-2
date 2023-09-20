import { Request, Response } from "express";

export const auth = async (req: Request, res: Response) => {
  return res.json({ message: "login" });
};
