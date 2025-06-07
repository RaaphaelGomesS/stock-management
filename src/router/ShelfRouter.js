import express from "express";
import ShelfController from "../controller/ShelfController.js";
import AuthService from "../service/AuthService.js";

const router = express.Router();

router.get("/shelves", AuthService.authentication, ShelfController.getAll);
router.get("/shelves/:id", AuthService.authentication, ShelfController.getById);
router.post("/shelves", AuthService.authentication, ShelfController.create);
router.put("/shelves/:id", AuthService.authentication, ShelfController.update);
router.delete("/shelves/:id", AuthService.authentication, ShelfController.delete);

export default router;
