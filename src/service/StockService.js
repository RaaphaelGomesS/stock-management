import prisma from "../../prisma/prismaClient.js";
import { StockError } from "../error/Error.js";

class StockService {
  async createStock(data) {
    const stock = await prisma.stock.create({
      data: {
        name: data.name,
        description: data.description,
        user_id: Number(data.user_id),
      },
    });
    return stock;
  }

  async getAllStocks(userId) {
    const stocks = await prisma.stock.findMany({
      where: { user_id: userId },
      include: {
        shelf: true,
      },
    });
    return stocks;
  }

  async getStockById({ id, userId }) {
    const stock = await prisma.stock.findFirst({
      where: {
        id: Number(id),
        user_id: userId,
      },
      include: {
        shelf: true,
      },
    });
    return stock;
  }

  async updateStock({ id, userId, ...data }) {
    const existing = await prisma.stock.findFirst({
      where: {
        id: Number(id),
        user_id: userId,
      },
    });

    if (!existing) {
      throw new StockError("Estoque não encontrado ou não pertence ao usuário", 403);
    }

    const updatedStock = await prisma.stock.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        description: data.description,
        user_id: userId,
      },
    });
    return updatedStock;
  }

  async deleteStock({ id, userId }) {
    const existing = await prisma.stock.findFirst({
      where: {
        id: Number(id),
        user_id: userId,
      },
    });

    if (!existing) {
      throw new StockError("Estoque não encontrado ou não pertence ao usuário", 403);
    }

    const deletedStock = await prisma.stock.delete({
      where: { id: Number(id) },
    });
    return deletedStock;
  }
}

export default new StockService();
