import express from "express";
import { login, registUser, test, getUserReports } from "./user.controller.js";
import { validateJwt } from "../Utils/jwt.js";

const api = express.Router();

api.get("/test", test);
api.post("/regist", registUser);
api.post("/login", login);
api.get("/reports", validateJwt, getUserReports);

export default api;
