const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const boom = require("@hapi/boom");
const errorHandler = require("./middleware/error-handler");
const auth = require("./routes/auth");
const errors = require("./routes/errors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
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
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
