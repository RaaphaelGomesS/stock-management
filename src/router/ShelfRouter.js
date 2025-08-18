import express from "express";
import ShelfController from "../controller/ShelfController.js";
import {authentication} from "../middlewares/AuthMiddleware.js";
import validate from "../middlewares/ReqTypeValidation.js";
import { updateShelf, createShelf } from "../utils/ShelfSchema.js";

const router = express.Router();

router.get("/stocked/:id", authentication, ShelfController.getAllShelvesInStock);
router.get("/layout/:id", authentication, ShelfController.getShelfLayout);
router.post("/", authentication, validate(createShelf), ShelfController.createShelf);
router.put("/:id", authentication, validate(updateShelf), ShelfController.updateShelf);
router.get("/:id", authentication, ShelfController.getById);
router.delete("/:id", authentication, ShelfController.deleteShelf);

export default router;
