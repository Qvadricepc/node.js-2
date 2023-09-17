import fs from "fs";
import { join } from "path";
import { Request, Response } from "express";

export const accessLogStream = fs.createWriteStream(
  join(__dirname, "../../logs/access-morgan.log"),
  {
    flags: "a",
  },
);

export const skipLog = (req: Request, res: Response) => {
  return res.statusCode !== 500;
};
