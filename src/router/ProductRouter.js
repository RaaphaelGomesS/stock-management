import express from "express";
import ProductController from "../controller/ProductController.js";
import { authentication } from "../middlewares/AuthMiddleware.js";
import { stockContext } from "../middlewares/stockContextMiddleware.js";
import upload from "../config/multerConfig.js";
import validate from "../middlewares/ReqTypeValidation.js";
import { updateProduct, createProduct, adjustment } from "../utils/ProductSchema.js";

const router = express.Router();

router.get("/search", authentication, stockContext, ProductController.searchProductByName);
router.get("/history", authentication, stockContext, ProductController.recentChangedProducts);
router.get("/ean/:ean", authentication, stockContext, ProductController.searchProductByEanTemplate);

router.post("/:id/adjust", authentication, validate(adjustment), ProductController.adjustQuantity);
router.get("/template/search", authentication, ProductController.searchTemplateByName);
router.get("/shelf/:id", authentication, ProductController.findAllProductsInShelf);
router.get("/template/:ean", authentication, ProductController.findTemplateEan);
router.delete("/:id", authentication, ProductController.deleteProduct);
router.get("/:id", authentication, ProductController.findProductId);
router.post(
  "/",
  authentication,
  upload.single("productImage"),
  validate(createProduct),
  ProductController.registerProduct
);
router.put(
  "/:id",
  authentication,
  upload.single("productImage"),
  validate(updateProduct),
  ProductController.updateProduct
);

export default router;
