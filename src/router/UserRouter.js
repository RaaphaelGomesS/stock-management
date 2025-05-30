import express from "express";
import UserController from "../controller/UserController.js"

const router = express.Router();

//User
router.post("/create", UserController);

export default router;