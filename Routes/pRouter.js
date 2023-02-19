import express from "express";
import { GetProducts } from "../Controllers/controllers.js";

const pRouter = express.Router();

pRouter.get("/", GetProducts);
export default pRouter;
