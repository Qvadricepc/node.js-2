import { createLogger, format, transports } from "winston";
const path = require("path");
const logPath = path.join(__dirname, "../logs/logfile-winston.log");

export const loggerWinston = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logPath }).on("error", (err: Error) => {
      console.error("Error writing to log file", err);
    }),
  ],
});
