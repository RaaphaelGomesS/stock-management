import AuthService from "../service/AuthService.js";
import StockController from "../controller/StockController.js";
import express from "express";

const router = express.Router();



router.post('/', StockController.createStock);
router.get("/", AuthService.authentication, StockController.getAllStocks);
router.get('/:id', StockController.getStockById);
router.put('/:id', StockController.updateStock);
router.delete('/:id', StockController.deleteStock);

export default router;
