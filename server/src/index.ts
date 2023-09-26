import { loggerWinston } from "./utils/loggers/logger-winston";
import { PORT } from "./config";
import { initializeMiddlewares } from "./utils/initialize/middlewears";
import { initializeRoutes } from "./utils/initialize/routes";
import { initializeErrorHandling } from "./utils/initialize/errors";
const express = require("express");

const app = express();

initializeMiddlewares(app);

initializeRoutes(app);

initializeErrorHandling(app);

process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

app.listen(PORT, () => {
  loggerWinston.info("Server is running");
  console.log(`Server is running on http://localhost:${PORT}`);
});
