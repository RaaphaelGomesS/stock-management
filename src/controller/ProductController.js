import ProductService from "../service/ProductService.js";
import TemplateService from "../service/TemplateService.js";

class ProductController {
  async registerProduct(req, res, next) {
    try {
      const product = await ProductService.registerProduct(
        req.userId,
        req.body
      );

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async findTemplateId(req, res, next) {
    try {
      const ean = parseInt(req.params.id);
      const template = await TemplateService.findTemplateByEan(ean);

      res.status(200).json(template);
    } catch (error) {
      next(error);
    }
  }

  async findProductId(req, res, next) {
    try {
      const productId = parseInt(req.params.id);
      const product = await ProductService.findProductById(
        req.userId,
        productId
      );

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async updadeProduct(req, res, next) {
    try {
      const productId = parseInt(req.params.id);
      const product = await ProductService.updadeProduct(
        req.userId,
        productId,
        req.body
      );

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const productId = parseInt(req.params.id);

      await ProductService.deleteProduct(req.userId, productId);

      res.status(200).json({ message: `Produto:${productId}, deletado com sucesso!` });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
