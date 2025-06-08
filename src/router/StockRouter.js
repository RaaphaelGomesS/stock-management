import AuthService from "../service/AuthService.js";
import StockController from "../controller/StockController.js";
import express from "express";

const router = express.Router();

router.post("/", AuthService.authentication, StockController.createStock);
router.get("/", AuthService.authentication, StockController.getAllStocks);
router.get("/:id", AuthService.authentication, StockController.getStockById);
router.put("/:id", AuthService.authentication, StockController.updateStock);
router.delete("/:id", AuthService.authentication, StockController.deleteStock);

export default router;
