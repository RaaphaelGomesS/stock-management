import express from "express";
import UserController from "../controller/UserController.js"

const router = express.Router();

router.post("/login", UserController.login()); 
router.post("/register", UserController.registerUser());

export default router; 