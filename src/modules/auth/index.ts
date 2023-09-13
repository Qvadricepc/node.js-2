const expressAuth = require("express");
const routerAuth = expressAuth.Router();
const { auth } = require("./controllers");

routerAuth.post("/login", auth);

module.exports = routerAuth;
