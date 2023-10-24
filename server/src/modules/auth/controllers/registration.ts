import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
import { generateTokens } from "../../../utils/tokken/generate";
const User = require("../../../models/users-schema");

export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(boom.badRequest("No data"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(boom.conflict("Email already registered"));
    }

    const register = async (userData: any) => {
      const user = new User(userData);
      return await user.save();
    };

    await register({ email, password });

    const tokens = generateTokens({ email });

    return res.json({
      message: "Successfully registered!",
      tokens,
    });
  } catch (error) {
    next(error);
  }
  return res.json({
    message: "registration",
  });
};
