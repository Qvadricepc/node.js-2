import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
import { generateTokens } from "../../../utils/generateTokkens";

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

  return res.json({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });
};
