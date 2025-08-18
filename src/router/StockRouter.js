import express from "express";
import StockController from "../controller/StockController.js";
import {authentication} from "../middlewares/AuthMiddleware.js";
import validate from "../middlewares/ReqTypeValidation.js";
import { updateStock, createStock } from "../utils/StockSchema.js";

const router = express.Router();

router.post("/", authentication, validate(createStock), StockController.createStock);
router.get("/", authentication, StockController.getAllStocks);
router.get("/:id", authentication, StockController.getStockById);
router.put("/:id", authentication, validate(updateStock), StockController.updateStock);
router.delete("/:id", authentication, StockController.deleteStock);

export default router;
