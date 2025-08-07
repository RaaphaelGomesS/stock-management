import express from "express";
import ShelfController from "../controller/ShelfController.js";
import AuthService from "../service/AuthService.js";

const router = express.Router();

router.get("/stocked/:id", AuthService.authentication, ShelfController.getAllShelvesInStock);
router.get("/layout", AuthService.authentication, ShelfController.getShelfLayout);
router.post("/", AuthService.authentication, ShelfController.createShelf);
router.put("/:id", AuthService.authentication, ShelfController.updateShelf);
router.get("/:id", AuthService.authentication, ShelfController.getById);
router.delete("/:id", AuthService.authentication, ShelfController.deleteShelf);

export default router;
