import ProductService from "../service/ProductService.js";
import TemplateService from "../service/TemplateService.js";

class ProductController {
  async registerProduct(req, res, next) {
    try {
      const userId = req.userId;
      const product = await ProductService.registerProduct(userId, req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async findTemplateId(req, res, next) {
    try {
      const ean = parseInt(req.params.ean);
      const template = await TemplateService.findTemplateByEan(ean);
      if (!template) {
        res.status(301).json("Template não encontrado.");
      }
      res.status(200).json(template);
    } catch (error) {
      next(error);
    }
  }

  async findProductId(req, res, next) {
    try {
      const userId = req.userId;
      const productId = parseInt(req.params.id);
      const product = await ProductService.findProductById(userId, productId);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async updadeProduct(req, res, next) {
    try {
      const userId = req.userId;
      const productId = parseInt(req.params.id);
      const product = await ProductService.updadeProduct(
        userId,
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
      const userId = req.userId;
      const productId = parseInt(req.params.id);

      await ProductService.deleteProduct(userId, productId);
      res
        .status(200)
        .json(`Mensagem: Produto:${productId}, deletado com sucesso!`);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
