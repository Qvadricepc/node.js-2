const express = require("express");
require("dotenv").config();
const boom = require("@hapi/boom");
const errorHandler = require("./middleware/error-handler");
const auth = require("./routes/auth");
const errors = require("./routes/errors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/ping", async (req, res, next) => {
  return res.json({ message: "pong" });
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
  console.log(`Server is running on http://localhost:${PORT}`);
});
