const express = require("express");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  return res.json({ message: "login" });
});

module.exports = router;
