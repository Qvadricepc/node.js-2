import { router as auth } from "../../../modules/auth";
import { router as errors } from "../../../modules/errors";
import { Express, Response, Request } from "express";

export const initializeRoutes = (app: Express) => {
  app.get("/", async (req: Request, res: Response) => {
    return res.json({ message: "pong" });
  });

  app.use("/auth", auth);
  app.use("/errors", errors);
};
