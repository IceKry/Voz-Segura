import express from "express";
import {
  test,
  createReport,
  getAllReports,
  updateReportStatus,
} from "./report.controller.js";
import { validateJwt } from "../Utils/jwt.js";
import { isAdmin } from "../Utils/validator.js";

const api = express.Router();

api.get("/test", test);
api.post("/create", validateJwt, createReport);
api.get("/all", [validateJwt, isAdmin], getAllReports);
api.put("/update-status/:id", [validateJwt, isAdmin], updateReportStatus);

export default api;
