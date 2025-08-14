import ProductService from "../service/ProductService.js";
import TemplateService from "../service/TemplateService.js";

class ProductController {
  async registerProduct(req, res, next) {
    try {
      const product = await ProductService.registerProduct(req.userId, req.body, req.file);

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async findTemplateEan(req, res, next) {
    try {
      const ean = parseInt(req.params.ean);
      const template = await TemplateService.findTemplateByEan(ean);

      res.status(200).json(template);
    } catch (error) {
      next(error);
    }
  }

  async findProductId(req, res, next) {
    try {
      const productId = parseInt(req.params.id);
      const product = await ProductService.findProductById(productId, req.userId);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async findAllProductsInShelf(req, res, next) {
    try {
      const shelfId = parseInt(req.params.id);

      const products = await ProductService.findAllProductsInShelf(shelfId);

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async recentChangedProducts(req, res, next) {
    try {
      const products = await ProductService.productHistorical(req.userId);

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async searchProductByName(req, res, next) {
    try {
      const search = req.query.q;

      const products = await ProductService.searchProductByName(req.userId, search);

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async searchTemplateByName(req, res, next) {
    try {
      const search = req.query.q;

      const products = await ProductService.searchTemplateByName(search);

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async searchProductByEanTemplate(req, res, next) {
    try {
      const ean = parseInt(req.params.ean);
      const template = await ProductService.searchProductByEanTemplate(req.userId, ean);

      res.status(200).json(template);
    } catch (error) {
      next(error);
    }
  }

  async adjustQuantity(req, res, next) {
    try {
      const productId = parseInt(req.params.id);
      const product = await ProductService.adjustQuantity(req.userId, productId, req.body);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const productId = parseInt(req.params.id);
      const product = await ProductService.updateProduct(productId, req.userId, req.body);

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
