import express from "express";
import {
  addResponses,
  getUserResponses,
  deleteResponse,
} from "../controllers/Congozi.responses.controllers";
import { normal } from "../middleware/middleware";
const responsesRoute = express.Router();
responsesRoute.post("/add", normal, addResponses);
responsesRoute.get("/user", normal, getUserResponses);
responsesRoute.delete("/supper/:id", deleteResponse);
export default responsesRoute;
