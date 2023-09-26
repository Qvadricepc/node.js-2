import boom from "@hapi/boom";
import { errorHandler } from "../../../middleware/error-handler";
import { Express, Response, Request, NextFunction } from "express";

export const initializeErrorHandling = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(boom.notFound());
  });

  app.use(errorHandler);
};
