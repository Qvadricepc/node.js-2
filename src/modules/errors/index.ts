import { badRequest } from "./controllers/bad-request";
import { unauthorized } from "./controllers/unauthorized";
import { forbidden } from "./controllers/forbidden";
import { badImplementation } from "./controllers/bad-implementation";

const express = require("express");
export const router = express.Router();

router.post("/400", badRequest);

router.post("/401", unauthorized);

router.post("/403", forbidden);

router.post("/500", badImplementation);
