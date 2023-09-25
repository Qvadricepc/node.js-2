import { auth } from "./controllers/auth";
import { refresh } from "./controllers/refresh";
import { protectedRoute } from "./controllers/protected-route";
import { isAuthorized } from "../../middleware/is-authorized";

const express = require("express");
export const router = express.Router();

router.post("/login", auth);

router.post("/refresh", refresh);

router.post("/protected", isAuthorized, protectedRoute);
