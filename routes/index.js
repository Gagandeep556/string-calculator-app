import { Router } from "express";
import AddController from "../controllers/add.controller";

const routes = Router();

routes.post("/add", AddController.addDigit);

export default routes;
