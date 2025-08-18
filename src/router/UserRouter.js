import express from "express";
import UserController from "../controller/UserController.js";
import { authentication } from "../middlewares/AuthMiddleware.js";
import { verifyUserPermission } from "../middlewares/PermissionMiddleware.js";
import validate from "../middlewares/ReqTypeValidation.js";
import { updateUser, createUser, login } from "../utils/UserSchema.js";

const router = express.Router();

router.post("/login", validate(login), UserController.login);
router.post("/register", validate(createUser), UserController.registerUser);
router.get("/user", authentication, UserController.getUser);
router.put("/user/:id", authentication, validate(updateUser), verifyUserPermission, UserController.updateUser);
router.delete("/user/:id", authentication, verifyUserPermission, UserController.deleteUser);

export default router;
