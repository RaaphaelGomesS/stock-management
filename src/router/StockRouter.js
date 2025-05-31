import express from "express";
import StockController from "../controller/StockController.js";

const router = express.Router();

router.post("/create", StockController.createStock);
router.get("/", StockController.getAllStocks);
router.get("/:id", StockController.getStock);
router.delete("/delete/:id", StockController.deleteStock);
router.put("/update/:id", StockController.updateStock);

export default router;
