import express from "express";
import authController from "../controllers/auth-controller";

const routerAuth = express.Router();

routerAuth.post("/register", authController.register);
routerAuth.post("/login", authController.login);

export default routerAuth;
