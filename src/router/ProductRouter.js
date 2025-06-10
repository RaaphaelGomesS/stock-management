import express, { Router } from "express";
import ProductController from "../controller/ProductController";


const router = express.Router();
router.post("/register", ProductController.Registerproduct);
router.get("/find", ProductController.findProductID);
router.put("/update/:id", ProductController.updadeProduct);
router.delete("/delete/:id", ProductController.deleteProduct);

export default router;