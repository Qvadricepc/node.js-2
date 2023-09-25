import { Request, Response } from "express";

export const protectedRoute = (req: Request, res: Response) => {
  return res.json({ message: "This is protected route" });
};
