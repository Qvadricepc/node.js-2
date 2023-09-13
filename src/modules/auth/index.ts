import { auth } from "./controllers/auth";
const expressAuth = require("express");
const routerAuth = expressAuth.Router();

routerAuth.post("/login", auth);

module.exports = routerAuth;
