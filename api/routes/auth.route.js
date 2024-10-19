import express from "express";
import { google, signin, signUp } from "../controller/auth.controller.js";
const route = express.Router();
route.post("/signup", signUp);
route.post("/signin", signin);
route.post("/google", google);

export default route;
