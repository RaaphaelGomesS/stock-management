import StockService from "../service/StockService.js";

class StockController {
  async createStock(req, res, next) {
    try {
      const stock = await StockService.createStock(req.validatedBody, req.userId);

      res.status(201).json(stock);
    } catch (error) {
      next(error);
    }
  }

  async getAllStocks(req, res, next) {
    try {
      const stocks = await StockService.getAllStocks(req.userId);

      res.status(200).json(stocks);
    } catch (error) {
      next(error);
    }
  }

  async getStockById(req, res, next) {
    try {
      const id = parseInt(req.params.id);

      const stock = await StockService.getStockById(id, req.userId);

      res.status(200).json(stock);
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req, res, next) {
    try {
      const id = parseInt(req.params.id);

      const updatedStock = await StockService.updateStock(id, req.userId, req.validatedBody);

      res.status(200).json(updatedStock);
    } catch (error) {
      next(error);
    }
  }

  async deleteStock(req, res, next) {
    try {
      const id = parseInt(req.params.id);

      await StockService.deleteStock(id, req.userId);

      res.status(204);
    } catch (error) {
      next(error);
    }
  }
}

export default new StockController();
