import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
import { generateTokens } from "../../../utils/tokken/generate";

const mockUser = {
  id: "1",
  email: "Test",
  password: "1111",
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.password) {
    return next(boom.badRequest());
  }
  if (
    req.body.email !== mockUser.email ||
    req.body.password !== mockUser.password
  ) {
    return next(boom.forbidden());
  }
  const response = req.body;
  const tokens = generateTokens(response);
  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return res.json({
    accessToken: tokens.accessToken,
  });
};
