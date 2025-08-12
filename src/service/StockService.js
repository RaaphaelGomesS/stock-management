import prisma from "../../prisma/prismaClient.js";
import { StockError } from "../error/Error.js";

class StockService {
  async createStock(reqBody, userId) {
    await this.verifyAlreadyExist(reqBody.name, userId);

    return await prisma.stock.create({
      data: {
        name: reqBody.name,
        description: reqBody.description,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
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

  async updateStock(id, userId, reqBody) {
    await this.getStockById(id, userId);

    const updatedStock = await prisma.stock.update({
      where: { id },
      data: {
        name: reqBody.name,
        description: reqBody.description,
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
      where: { id, user_id: userId },
    });

    if (!stock) {
      throw new StockError("Estoque não encontrado!", 404);
    }

    return stock;
  }

  async verifyAlreadyExist(name, userId) {
    const stock = await prisma.stock.findFirst({
      where: { name, user_id: userId },
    });

    if (stock) {
      throw new StockError("Estoque não encontrado!", 404);
    }
  }
}

export default new StockService();
