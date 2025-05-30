import StockService from "../service/StockService.js";

class StockController {
  async createStock(req, res, next) {
    try {
      const stock = await StockService.createStock(req.body);
      res.status(201).json(stock);
    } catch (error) {
      next(error);
    }
  }

  async getAllStocks(req, res, next) {
    try {
      const stock = await StockService.getAllStocks(req.body);
      res.status(201).json(stock);
    } catch (error) {
      next(error);
    }
  }

  async getStockById(req, res, next) {
    try {
      const stock = await StockService.getStockById(req.body);
      res.status(201).json(stock);
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req, res, next) {
    try {
      const stock = await StockService.getStockById(req.body);
      res.status(201).json(stock);
    } catch (error) {
      next(error);
    }
  }

  async deleteStock(req, res, next) {
    try {
      const stock = await StockService.deleteStock(req.body);
      res.status(201).json(stock);
    } catch (error) {
      next(error);
    }
  }
}

export default new StockController();
