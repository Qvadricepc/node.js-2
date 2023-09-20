import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./middleware/error-handler";
import { router as auth } from "./modules/auth";
import { router as errors } from "./modules/errors";
import {
  accessLogStream,
  skipLog,
} from "./utils/loggers/logger-to-file-morgan";
import { loggerWinston } from "./utils/loggers/logger-winston";
import { noCache } from "./middleware/no-cache";
const express = require("express");
require("dotenv").config();
const boom = require("@hapi/boom");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(morgan("combined"));
app.use(noCache);

app.use(morgan("combined", { stream: accessLogStream, skip: skipLog }));
app.get("/", async (req: Request, res: Response) => {
  return res.json({ message: "pong" });
});

app.use("/auth", auth);
app.use("/errors", errors);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(boom.notFound());
});

app.use(errorHandler);

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
