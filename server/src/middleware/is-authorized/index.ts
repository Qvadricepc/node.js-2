import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
const jwt = require("jsonwebtoken");
import { VerifyErrors, JwtPayload } from "jsonwebtoken";
export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return next(boom.forbidden("Invalid access token"));
  }

  jwt.verify(
    token,
    process.env.JWT_ACCESS_TOKEN,
    (err: VerifyErrors, payload: JwtPayload) => {
      if (err) {
        return next(boom.unauthorized("Token is not valid"));
      }
      next();
    },
  );
};
