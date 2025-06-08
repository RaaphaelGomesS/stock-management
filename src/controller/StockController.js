import StockService from "../service/StockService.js";

class StockController {
  async createStock(req, res, next) {
    try {
      const stock = await StockService.createStock(req.body, req.userId);
      res.status(201).json({ message: "Estoque criado com sucesso", stock });
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
      const userId = req.userId;
      const id = parseInt(req.params.id);

      const stock = await StockService.getStockById(id, userId);

      res.status(200).json(stock);
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req, res, next) {
    try {
      const userId = req.userId;
      const id = parseInt(req.params.id);

      const updatedStock = await StockService.updateStock(id, userId, {
        ...req.body,
      });

      res.status(200).json({
        message: "Estoque atualizado com sucesso",
        stock: updatedStock,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteStock(req, res, next) {
    try {
      const userId = req.userId;
      const id = parseInt(req.params.id);

      await StockService.deleteStock(id, userId);

      res
        .status(200)
        .json({ message: `Mensagem: Estoque: ${id}, deletado com sucesso!` });
    } catch (error) {
      next(error);
    }
  }
}

export default new StockController();
