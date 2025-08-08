import prisma from "../../prisma/prismaClient.js";
import Validation from "../utils/Validation.js";
import { ProductError, UserError } from "../error/Error.js";
import TemplateService from "./TemplateService.js";
import ShelfService from "./ShelfService.js";

class ProductService {
  async registerProduct(userId, reqBody) {
    Validation.validateTypes(reqBody);

    await this.verifyProductAlreadyExist(userId, reqBody.name, reqBody.type);

    ShelfService.verifyCanPutProduct(reqBody.shelf, reqBody.row, reqBody.column);

    try {
      const newProduct = await prisma.$transaction(async (tx) => {
        let template = await prisma.productTemplate.findUnique({
          where: { ean: reqBody.ean },
        });

        if (!template) {
          template = await TemplateService.createProductTemplate(reqBody, tx);
        }

        const createProduct = await tx.product.create({
          data: {
            name: template.name,
            description: template.description,
            type: template.type,
            lote_type: template.loteType,
            shelf: reqBody.shelf,
            weight: reqBody.weight,
            lote_amount: reqBody.loteAmount,
            quantity: reqBody.quantity,
            validity: reqBody.validity,
            column: reqBody.column,
            row: reqBody.row,
            product_template: {
              connect: {
                ean: template.ean,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        await ShelfService.updateShelfFullStatus(createProduct.shelf_id, tx);

        return createProduct;
      });

      return newProduct;
    } catch (error) {
      throw new ProductError(`Falha ao salvar o produto e atualizar a prateleira`, 400);
    }
  }

  async updateProduct(id, userId, reqBody) {
    Validation.validateTypes(reqBody);

    const product = await this.findProductById(id);

    if (product.user_id != userId) {
      throw new UserError("Não possui permissão para alterar esse produto!", 401);
    }

    if (reqBody.shelfId !== product.shelf_id || reqBody.row !== product.row || reqBody.column !== product.column) {
      ShelfService.verifyCanPutProduct(reqBody.shelf, reqBody.row, reqBody.column);

      return prisma.$transaction(async (tx) => {
        const updatedProduct = await tx.product.update({
          where: { id },
          data: {
            name: reqBody.name,
            description: reqBody.description,
            type: reqBody.type,
            lote_type: reqBody.loteType,
            shelf: reqBody.shelf,
            weight: reqBody.weight,
            lote_amount: reqBody.loteAmount,
            quantity: reqBody.quantity,
            validity: reqBody.validity,
            column: reqBody.column,
            row: reqBody.row,
          },
        });

        await ShelfService.updateShelfFullStatus(product.shelf_id, tx);
        await ShelfService.updateShelfFullStatus(updatedProduct.shelf_id, tx);

        return updatedProduct;
      });
    } else {
      return await prisma.product.update({
        where: { id },
        data: {
          name: reqBody.name,
          description: reqBody.description,
          type: reqBody.type,
          lote_type: reqBody.loteType,
          shelf: reqBody.shelf,
          weight: reqBody.weight,
          lote_amount: reqBody.loteAmount,
          quantity: reqBody.quantity,
          validity: reqBody.validity,
          column: reqBody.column,
          row: reqBody.row,
        },
      });
    }
  }

  async adjustQuantity(userId, productId, reqBody) {
    Validation.validateTypes(reqBody);

    const product = await this.findProductById(productId);

    if (product.user_id != userId) {
      throw new UserError("Não possui permissão para alterar esse produto!", 401);
    }

    const quantityWithAdjust = product.quantity + parseInt(reqBody.adjustment);

    return prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        quantity: quantityWithAdjust,
      },
    });
  }

  async deleteProduct(userId, id) {
    const product = await this.findProductById(id);

    if (product.user_id != userId) {
      throw new UserError("Não possui permissão para alterar esse produto!", 401);
    }

    return prisma.$transaction(async (tx) => {
      await prisma.product.delete({
        where: { id },
      });

      await ShelfService.updateShelfFullStatus(product.shelf_id, tx);
    });
  }

  async findProductById(id) {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new ProductError("Produto não encontrado!", 404);
    }
    return product;
  }

  async findAllProductsInShelf(shelfId) {
    const products = await prisma.product.findMany({
      where: {
        shelf_id: shelfId,
      },
    });

    if (products.length === 0) {
      throw new ProductError(`Nenhum produto encontrado na prateleira ${shelfId}`, 404);
    }

    return products;
  }

  async productHistorical(userId) {
    const products = await prisma.product.findMany({
      take: 5,
      where: {
        userId: userId,
      },
      orderBy: {
        updated_date: "desc",
      },
    });

    if (products.length === 0) {
      throw new ProductError(`Nenhum produto encontrado para o usuário ${userId}`, 404);
    }

    return products;
  }

  async verifyProductAlreadyExist(userId, name, type) {
    const product = await prisma.product.findFirst({
      where: { user_id: userId, name: name, type: type },
    });

    if (product) {
      throw new ProductError("Produto já registrado!", 400);
    }
  }
}

export default new ProductService();
