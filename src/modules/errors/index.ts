const expressErrors = require("express");
const routerErrors = expressErrors.Router();
const {
  badRequest,
  unAuthorized,
  forbidden,
  badImplementation,
} = require("./controllers");

routerErrors.post("/400", badRequest);

routerErrors.post("/401", unAuthorized);

routerErrors.post("/403", forbidden);

routerErrors.post("/500", badImplementation);

module.exports = routerErrors;
