import { Request, Response, NextFunction } from "express";
const express = require("express");
require("dotenv").config();
const boom = require("@hapi/boom");
const errorHandler = require("./middleware/error-handler/index");
const auth = require("./modules/auth");
const errors = require("./modules/errors");
const fs = require("fs");
const morgan = require("morgan");
const { createLogger, format, transports } = require("winston");
const { join } = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(morgan("combined"));

const accessLogStream = fs.createWriteStream(join(__dirname, "access.log"), {
  flags: "a",
});

function skipLog(req: Request, res: Response) {
  return res.statusCode !== 500;
}

app.use(morgan("combined", { stream: accessLogStream, skip: skipLog }));
app.get("/ping", async (req: Request, res: Response) => {
  return res.json({ message: "pong" });
});

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logfile.log" }),
  ],
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
  logger.info("Server is running");
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
