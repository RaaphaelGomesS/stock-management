import express from "express";
import UserController from "../controller/UserController.js";
import AuthService from "../service/AuthService.js";


const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.registerUser);

router.get("/user", AuthService.authentication, UserController.getUser);
router.put("/user/:id", AuthService.authentication, UserController.updateUser);
router.delete("/user/:id", AuthService.authentication, UserController.deleteUser);

export default router;