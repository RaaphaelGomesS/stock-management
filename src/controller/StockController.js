import StockService from "../service/StockService.js";

class StockController {
  async createStock(req, res, next) {
    try {
      const stock = await StockService.createStock(req.body);
      res.status(201).json({message: "Estoque criado com sucesso", stock});
    } catch (error) {
      next(error);
    }
  }

  async getAllStocks(req, res, next) {
    try {
      const userId = req.userId;
      const stocks = await StockService.getAllStocks(userId);
      res.status(200).json(stocks);
    } catch (error) {
      next(error);
    }
  }

  async getStockById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const stock = await StockService.getStockById({ id, userId });

      if (!stock) {
        return res.status(404).json({ message: "Estoque não encontrado" });
      }

      res.status(200).json(stock);
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const updatedStock = await StockService.updateStock({
        id,
        userId,
        ...req.body,
      });
      res
        .status(200)
        .json({ message: "Estoque atualizado com sucesso", stock: updatedStock });
    } catch (error) {
      next(error);
    }
  }

  async deleteStock(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const deletedStock = await StockService.deleteStock({ id, userId });

      res.status(200).json({
        message: "Estoque deletado com sucesso",
        stock: deletedStock,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new StockController();
