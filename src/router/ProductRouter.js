import express from "express";
import ProductController from "../controller/ProductController.js";
import AuthService from "../service/AuthService.js";

const router = express.Router();

router.get("/history", AuthService.authentication,  ProductController.recentChangedProducts);
router.get("/shelf/:id", AuthService.authentication,  ProductController.findAllProductsInShelf);
router.get("/template/:id", AuthService.authentication,  ProductController.findTemplateId);
router.post("/", AuthService.authentication, ProductController.registerProduct);
router.get("/:id", AuthService.authentication, ProductController.findProductId);
router.put("/:id", AuthService.authentication, ProductController.updateProduct);
router.delete("/:id", AuthService.authentication, ProductController.deleteProduct);

export default router;