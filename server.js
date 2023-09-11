const express = require("express");
require("dotenv").config();
const boom = require("@hapi/boom");
const errorHandler = require("./middleware/error-handler");
const auth = require("./routes/auth");
const errors = require("./routes/errors");
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

function skipLog(req, res) {
  return res.statusCode !== 500;
}

app.use(morgan("combined", { stream: accessLogStream, skip: skipLog }));
app.get("/ping", async (req, res, next) => {
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

app.use((req, res, next) => {
  next(boom.notFound());
});

app.use(errorHandler);

process.on("uncaughtException", (error) => {
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
