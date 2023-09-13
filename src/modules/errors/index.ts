import { badRequest } from "./controllers/bad-request";
import { unauthorized } from "./controllers/unauthorized";
import { forbidden } from "./controllers/forbidden";
import { badImplementation } from "./controllers/bad-implementation";

const expressErrors = require("express");
const routerErrors = expressErrors.Router();

routerErrors.post("/400", badRequest);

routerErrors.post("/401", unauthorized);

routerErrors.post("/403", forbidden);

routerErrors.post("/500", badImplementation);

module.exports = routerErrors;
