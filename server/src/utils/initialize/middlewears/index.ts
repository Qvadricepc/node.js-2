import { accessLogStream, skipLog } from "../../loggers/logger-to-file-morgan";
import { Express } from "express";
const express = require("express");
const morgan = require("morgan");
const nocache = require("nocache");
const cors = require("cors");
const cookieParser = require("cookie-parser");
import helmet from "helmet";

export const initializeMiddlewares = (app: Express) => {
  app.use(express.json());
  app.set("etag", "strong");

  app.use(nocache());
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());

  app.use(morgan("combined"));
  app.use(morgan("combined", { stream: accessLogStream, skip: skipLog }));
};
