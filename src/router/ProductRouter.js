import express from "express";
import ProductController from "../controller/ProductController.js";
import AuthService from "../service/AuthService.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.post("/:id/adjust", AuthService.authentication, ProductController.adjustQuantity);
router.get("/history", AuthService.authentication, ProductController.recentChangedProducts);
router.get("/shelf/:id", AuthService.authentication, ProductController.findAllProductsInShelf);
router.get("/search", AuthService.authentication, ProductController.searchProductByName);
router.get("/:ean", AuthService.authentication, ProductController.searchProductByEanTemplate);
router.get("/template/search", AuthService.authentication, ProductController.searchTemplateByName);
router.get("/template/:ean", AuthService.authentication, ProductController.findTemplateEan);
router.post("/", AuthService.authentication, upload.single('productImage'), ProductController.registerProduct);
router.get("/:id", AuthService.authentication, ProductController.findProductId);
router.put("/:id", AuthService.authentication, ProductController.updateProduct);
router.delete("/:id", AuthService.authentication, ProductController.deleteProduct);

export default router;
