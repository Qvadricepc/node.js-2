const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const createError = require("http-errors");
const errorHandler = require("./middleware/errorHandler");
const auth = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json());

app.get("/ping", async (req, res, next) => {
  return res.json({ message: "pong" });
});

app.use("/auth", auth);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
