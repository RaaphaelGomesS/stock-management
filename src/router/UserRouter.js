import express from "express";
import UserController from "../controller/UserController.js";
import { authentication } from "../middlewares/AuthMiddleware.js";
import { verifyUserPermission } from "../middlewares/PermissionMiddleware.js";

const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.registerUser);
router.get("/user", authentication, verifyUserPermission, UserController.getUser);
router.put("/user/:id", authentication, verifyUserPermission, UserController.updateUser);
router.delete("/user/:id", authentication, verifyUserPermission, UserController.deleteUser);

export default router;
