import express from "express";
import ProductController from "../controller/ProductController.js";
import { authentication } from "../middlewares/AuthMiddleware.js";
import upload from "../config/multerConfig.js";
import validate from "../middlewares/ReqTypeValidation.js";
import { updateProduct, createProduct, adjustment } from "../utils/ProductSchema.js";

const router = express.Router();

router.post("/:id/adjust", authentication, validate(adjustment), ProductController.adjustQuantity);
router.get("/history", authentication, ProductController.recentChangedProducts);
router.get("/shelf/:id", authentication, ProductController.findAllProductsInShelf);
router.get("/search", authentication, ProductController.searchProductByName);
router.get("/ean/:ean", authentication, ProductController.searchProductByEanTemplate);
router.get("/template/search", authentication, ProductController.searchTemplateByName);
router.get("/template/:ean", authentication, ProductController.findTemplateEan);
router.post("/", authentication, upload.single("productImage"), validate(createProduct), ProductController.registerProduct);
router.get("/:id", authentication, ProductController.findProductId);
router.put("/:id", authentication, upload.single("productImage"), validate(updateProduct), ProductController.updateProduct);
router.delete("/:id", authentication, ProductController.deleteProduct);

export default router;
