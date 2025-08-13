import express from "express";
import ShelfController from "../controller/ShelfController.js";
import {authentication} from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/stocked/:id", authentication, ShelfController.getAllShelvesInStock);
router.get("/layout", authentication, ShelfController.getShelfLayout);
router.post("/", authentication, ShelfController.createShelf);
router.put("/:id", authentication, ShelfController.updateShelf);
router.get("/:id", authentication, ShelfController.getById);
router.delete("/:id", authentication, ShelfController.deleteShelf);

export default router;
