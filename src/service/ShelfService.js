import prisma from "../../prisma/prismaClient.js";
import { ShelfError } from "../error/Error.js";
import Validation from "../utils/Validation.js";
import StockService from "../service/StockService.js";

class ShelfService {
  async createShelf(validatedBody, userId) {
    Validation.validateTypes(validatedBody);

    await StockService.getStockById(validatedBody.stockId, userId);

    const shelf = await prisma.shelf.create({
      data: {
        columns: validatedBody.columns,
        rows: validatedBody.rows,
        destination: validatedBody.destination,
        restriction: validatedBody.restriction,
        user_id: userId,
        full: false,
        stock: {
          connect: {
            id: validatedBody.stockId,
          },
        },
      },
    });

    return shelf;
  }

  async updateShelf(id, userId, validatedBody) {
    await this.findById(id, userId);

    return await prisma.shelf.update({
      where: { id },
      data: {
        columns: validatedBody.columns,
        rows: validatedBody.rows,
        destination: validatedBody.destination,
        restriction: validatedBody.restriction,
      },
    });
  }

  async deleteShelf(id, userId) {
    await this.findById(id, userId);

    await prisma.shelf.delete({
      where: { id },
    });
  }

  async getAllShelves(userId, stockId) {
    return await prisma.shelf.findMany({
      where: {
        user_id: userId,
        stock_id: stockId,
      },
      include: {
        _count: {
          select: { product: true },
        },
      },
    });
  }

  async createShelfLayout(id, userId) {
    const shelfWithProducts = await prisma.shelf.findFirst({
      where: { id, user_id: userId },
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
      throw new ShelfError(`Prateleira com ID ${id} não encontrada ou não possui permissão.`, 404);
    }

    const { rows, columns, product: products } = shelfWithProducts;
    const layoutMatriz = Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(null));

    for (const p of products) {
      if (p.row != null && p.column != null) {
        layoutMatriz[p.row][p.column] = p;
      }
    }

    return layoutMatriz;
  }

  async findById(id, userId) {
    const shelf = await prisma.shelf.findFirst({
      where: { id, user_id: userId },
    });

    if (!shelf) {
      throw new ShelfError("Prateleira não encontrada ou não possui permissão.", 404);
    }

    return shelf;
  }

  async verifyCanPutProduct(id, row, collumn) {
    const shelf = await prisma.shelf.findUnique({
      where: { id },
      include: {
        product: {
          where: {
            row: row,
            column: collumn,
          },
        },
      },
    });

    if (!shelf) {
      throw new ShelfError("A prateleira não foi encontrada.", 404);
    }

    if (row > shelf.rows || collumn > shelf.columns) {
      throw new ShelfError("A posição escolhida não é suportada pela prateleira.", 400);
    }

    if (shelf.full) {
      throw new ShelfError(`A prateleira ${id} está cheia, não pode ser adicionado outro produto.`, 400);
    }

    if (shelf.product.length > 0) {
      throw new ShelfError("Já possui um produto na posição da prateleira.", 400);
    }
  }

  async updateShelfFullStatus(shelfId, prismaTx) {
    const db = prismaTx || prisma;

    try {
      const shelf = await db.shelf.findUniqueOrThrow({
        where: { id: shelfId },
      });

      const capacity = shelf.rows * shelf.columns;

      const productCount = await db.product.count({
        where: { shelf_id: shelfId },
      });

      const isFull = productCount >= capacity;

      if (shelf.full !== isFull) {
        await db.shelf.update({
          where: { id: shelfId },
          data: { full: isFull },
        });
        console.log(`Status da prateleira ${shelfId} atualizado para: ${isFull}`);
      }
    } catch (error) {
      throw new ShelfError("Erro ao atualizar status da prateleira.", 400);
    }
  }
}

export default new ShelfService();
