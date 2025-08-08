import prisma from "../../prisma/prismaClient.js";
import { StockError } from "../error/Error.js";

class StockService {
  async createStock(data, userId) {
    await this.verifyAlreadyExist(data.name);

    const stock = await prisma.stock.create({
      data: {
        name: data.name,
        description: data.description,
        user_id: userId,
      },
    });
    return stock;
  }

  async getAllStocks(userId) {
    const stocks = await prisma.stock.findMany({
      where: { user_id: userId },
    });

    if (!stocks) {
      throw new StockError("Nenhum estoque encontrado!", 404);
    }

    return stocks;
  }

  async updateStock(id, userId, { ...data }) {
    await this.getStockById(id, userId);

    const updatedStock = await prisma.stock.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        user_id: userId,
      },
    });
    return updatedStock;
  }

  async deleteStock(id, userId) {
    await this.getStockById(id, userId);

    return await prisma.stock.delete({
      where: { id },
    });
  }

  async getStockById(id, userId) {
    const stock = await prisma.stock.findFirst({
      where: { id },
    });

    if (!stock) {
      throw new StockError("Estoque não encontrado!", 404);
    }

    if (stock.user_id != userId) {
      throw new StockError("Não possui permissão para acessar o estoque!", 403);
    }

    return stock;
  }

  async verifyAlreadyExist(name) {
    const stock = await prisma.stock.findFirst({
      where: { name },
    });

    if (stock) {
      throw new StockError("Estoque não encontrado!", 404);
    }
  }
}

export default new StockService();
