import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
const jwt = require("jsonwebtoken");
import { VerifyErrors, JwtPayload } from "jsonwebtoken";
export const refresh = (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return next(boom.forbidden("Refresh token not provided"));
  }
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN,
    (err: VerifyErrors, payload: JwtPayload) => {
      if (err) {
        return next(boom.forbidden("Invalid refresh token"));
      }
      const newAccessToken = jwt.sign(
        { email: payload.email },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: "30m" },
      );
      const newRefreshToken = jwt.sign(
        { email: payload.email },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: "30d" },
      );
      res.cookie("refreshToken", newRefreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    },
  );
};
