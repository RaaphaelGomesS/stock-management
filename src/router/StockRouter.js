import express from "express";
import StockController from "../controller/StockController.js";
import {authentication} from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/", authentication, StockController.createStock);
router.get("/", authentication, StockController.getAllStocks);
router.get("/:id", authentication, StockController.getStockById);
router.put("/:id", authentication, StockController.updateStock);
router.delete("/:id", authentication, StockController.deleteStock);

export default router;
