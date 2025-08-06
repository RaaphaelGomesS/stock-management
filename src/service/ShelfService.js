import prisma from "../../prisma/prismaClient.js";
import { ShelfError } from "../error/Error.js";
import Validation from "../utils/Validation.js";

class ShelfService {
  async createShelf(data) {
    Validation.validateShelfData(data);

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
    Validation.validateShelfData(data);

    return await prisma.shelf.update({
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
      },
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

  async createShelfLayout(shelfId) {
    const shelfWithProducts = await prisma.shelf.findUnique({
      where: { id: shelfId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            column: true,
            row: true,
            image: true,
          },
        },
      },
    });

    if (!shelfWithProducts) {
      throw new ShelfError(`Prateleira com ID ${shelfId} não encontrada.`, 404);
    }

    const { rows, columns, product: products } = shelfWithProducts;
    const layoutMatriz = Array(rows).fill(null).map(() => Array(columns).fill(null));

    for (const p of products) {
      if (p.row != null && p.column != null) {
        layoutMatriz[p.row][p.column] = p;
      }
    }

    return layoutMatriz;
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
}

export default new ShelfService();
