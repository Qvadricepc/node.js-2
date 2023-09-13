import { auth } from "./controllers/auth";
const express = require("express");
export const router = express.Router();

router.post("/login", auth);
