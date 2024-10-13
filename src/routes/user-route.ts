import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import UserController from "../controllers/user-controller";
import { upload } from "../middlewares/upload-file-middleware";

const routeUser = express.Router();

routeUser.use(authMiddleware);

routeUser.get("/profile", authMiddleware, UserController.findUser);
routeUser.put("/profile/update", authMiddleware, UserController.editUser);
routeUser.put(
  "/profile/image",
  authMiddleware,
  upload.single("image"),
  UserController.editPhoto
);

export default routeUser;
