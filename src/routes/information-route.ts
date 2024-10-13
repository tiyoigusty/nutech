import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import InformationController from "../controllers/information-controller";

const routeInformation = express.Router();

routeInformation.use(authMiddleware);

routeInformation.get(
  "/banner",
  authMiddleware,
  InformationController.allBanner
);
routeInformation.get(
  "/services",
  authMiddleware,
  InformationController.allService
);

export default routeInformation;
