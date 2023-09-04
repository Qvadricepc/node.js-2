const express = require("express");
const router = express.Router();

router.get("/404", async (req, res, next) => {
  return res.json({ message: "404" });
});

module.exports = router;
