const express = require("express");
const router = express.Router();
const boom = require("@hapi/boom");

router.post("/400", (req, res, next) => {
  if (!req.body.email || !req.body.name) {
    return next(boom.badRequest());
  }
});

router.post("/401", (req, res, next) => {
  if (req.headers["authorization"] !== "Bearer valid-token") {
    return next(boom.unauthorized());
  }
});

router.post("/403", (req, res, next) => {
  next(boom.forbidden());
});

router.post("/500", (req, res, next) => {
  next(boom.badImplementation());
});

module.exports = router;
