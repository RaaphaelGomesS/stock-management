import prisma from "../../prisma/prismaClient.js";
import { ShelfError } from "../error/Error.js";

class ShelfService {
  async createShelf(data) {
    this.validateShelfData(data);

    const shelf = await prisma.shelf.create({
      data: {
        stock_id: data.stock_id,
        columns: data.columns,
        rows: data.rows,
        destination: data.destination,
        restriction: data.restriction,
        full: false,
        updated_date: new Date(),
        user_id: data.user_id,
      },
    });

    return shelf;
  }

  async updateShelf(id, data) {
    await this.findById(id);
    this.validateShelfData(data);

    const updatedShelf = await prisma.shelf.update({
      where: { id: Number(id) },
      data: {
        stock_id: data.stock_id,
        columns: data.columns,
        rows: data.rows,
        destination: data.destination,
        restriction: data.restriction,
        full: data.full,
        updated_date: new Date(),
        user_id: data.user_id,
      },
    });

    return updatedShelf;
  }

  async deleteShelf(id) {
    await this.findById(id);

    await prisma.shelf.delete({
      where: { id: Number(id) },
    });
  }

  async getAllShelves(userId) {
    return prisma.shelf.findMany({
      where: {
        user_id: userId,
      }
    });
  }

  async getShelfById(id) {
    const shelf = await prisma.shelf.findUnique({
      where: { id: Number(id) },
      include: {
        product: true,
        stock: true,
      },
    });

    if (!shelf) {
      throw new ShelfError("Prateleira não encontrada!", 404);
    }

    return shelf;
  }

  async findById(id) {
    const shelf = await prisma.shelf.findUnique({
      where: { id: Number(id) },
    });

    if (!shelf) {
      throw new ShelfError("Prateleira não encontrada!", 404);
    }

    return shelf;
  }

  validateShelfData(data) {
    if (
      !data.stock_id ||
      !data.columns ||
      !data.rows ||
      !data.destination ||
      !data.user_id
    ) {
      throw new ShelfError(
        "Campos obrigatórios da prateleira estão faltando!",
        400
      );
    }

    if (data.columns <= 0 || data.rows <= 0) {
      throw new ShelfError("Colunas e linhas devem ser maiores que zero!", 400);
    }
  }
}

export default new ShelfService();
