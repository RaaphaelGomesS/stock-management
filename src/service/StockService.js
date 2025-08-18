import prisma from "../../prisma/prismaClient.js";
import { StockError } from "../error/Error.js";

class StockService {
  async createStock(validatedBody, userId) {
    await this.verifyAlreadyExist(validatedBody.name, userId);

    return await prisma.stock.create({
      data: {
        name: validatedBody.name,
        description: validatedBody.description,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getAllStocks(userId) {
    return await prisma.stock.findMany({
      where: { user_id: userId },
    });
  }

  async updateStock(id, userId, validatedBody) {
    await this.getStockById(id, userId);

    const updatedStock = await prisma.stock.update({
      where: { id },
      data: {
        name: validatedBody.name,
        description: validatedBody.description,
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
      throw new StockError("Estoque não encontrado ou não possui permissão.", 404);
    }

    return stock;
  }

  async verifyAlreadyExist(name, userId) {
    const stock = await prisma.stock.findFirst({
      where: { name, user_id: userId },
    });

    if (stock) {
      throw new StockError("Já existe um estoque com esse nome.", 400);
    }
  }
}

export default new StockService();
