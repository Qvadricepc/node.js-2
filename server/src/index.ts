import express from "express";
import mongoose from "mongoose";
import { loggerWinston } from "./utils/loggers/logger-winston";
import { PORT } from "./config";
import { initializeMiddlewares } from "./utils/initialize/middlewears";
import { initializeRoutes } from "./utils/initialize/routes";
import { initializeErrorHandling } from "./utils/initialize/errors";

const app = express();

const MONGODB_URI =
  process.env.DB_URL || "mongodb://localhost:27017/yourDBName";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    loggerWinston.info("Successfully connected to MongoDB");

    initializeMiddlewares(app);
    initializeRoutes(app);
    initializeErrorHandling(app);

    app.listen(PORT, () => {
      loggerWinston.info("Server is running");
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    loggerWinston.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit if DB connection is unsuccessful
  });

process.on("uncaughtException", (error: Error) => {
  loggerWinston.error("Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  loggerWinston.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
