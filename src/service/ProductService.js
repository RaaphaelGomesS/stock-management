import prisma from "../../prisma/prismaClient.js";
import Validation from "../utils/Validation.js";
import { ProductError } from "../error/Error.js";
import TemplateService from "./TemplateService.js";
import ShelfService from "./ShelfService.js";

class ProductService {
  async registerProduct(userId, reqBody, file) {
    Validation.validateTypes(reqBody);

    await this.verifyProductAlreadyExist(userId, reqBody.name, reqBody.type, reqBody.ean);

    await ShelfService.verifyCanPutProduct(parseInt(reqBody.shelfId), reqBody.row, reqBody.column);

    try {
      const newProduct = await prisma.$transaction(async (tx) => {
        const imageUrl = file ? `/uploads/${file.filename}` : null;

        let template = await tx.productTemplate.findUnique({
          where: { ean: reqBody.ean },
        });

        if (!template) {
          template = await TemplateService.createProductTemplate(reqBody, imageUrl, tx);
        }

        const createProduct = await tx.product.create({
          data: {
            name: template.name,
            description: template.description,
            type: template.type,
            lote_type: template.loteType,
            weight: reqBody.weight,
            lote_amount: reqBody.loteAmount,
            quantity: reqBody.quantity,
            validity: reqBody.validity,
            column: reqBody.column,
            row: reqBody.row,
            image: imageUrl,
            user_id: userId,
            shelf: {
              connect: {
                id: reqBody.shelfId,
              },
            },
            product_template: {
              connect: {
                ean: template.ean,
              },
            },
          },
        });

        await ShelfService.updateShelfFullStatus(createProduct.shelf_id, tx);

        return createProduct;
      });

      return newProduct;
    } catch (error) {
      console.error("--- ERRO OCORREU DENTRO DA TRANSAÇÃO ---");
      console.error("Mensagem do Erro Original:", error.message);

      throw new ProductError(`Falha ao salvar o produto e atualizar a prateleira`, 400);
    }
  }

  async updateProduct(id, userId, reqBody) {
    Validation.validateTypes(reqBody);

    const product = await this.findProductById(id, userId);

    if (
      parseInt(reqBody.shelfId) !== product.shelf_id ||
      reqBody.row !== product.row ||
      reqBody.column !== product.column
    ) {
      await ShelfService.verifyCanPutProduct(parseInt(reqBody.shelfId), reqBody.row, reqBody.column);

      try {
        return prisma.$transaction(async (tx) => {
          const updatedProduct = await tx.product.update({
            where: { id },
            data: {
              name: reqBody.name,
              description: reqBody.description,
              type: reqBody.type,
              lote_type: reqBody.loteType,
              weight: reqBody.weight,
              lote_amount: reqBody.loteAmount,
              quantity: reqBody.quantity,
              validity: reqBody.validity,
              column: reqBody.column,
              row: reqBody.row,
              shelf: {
                connect: {
                  id: reqBody.shelfId,
                },
              },
            },
          });

          await ShelfService.updateShelfFullStatus(product.shelf_id, tx);
          await ShelfService.updateShelfFullStatus(updatedProduct.shelf_id, tx);

          return updatedProduct;
        });
      } catch (error) {
        console.error("--- ERRO OCORREU DENTRO DA TRANSAÇÃO ---");
        console.error("Mensagem do Erro Original:", error.message);

        throw new ProductError(`Falha ao atualizar o produto e a prateleira`, 400);
      }
    } else {
      return await prisma.product.update({
        where: { id },
        data: {
          name: reqBody.name,
          description: reqBody.description,
          type: reqBody.type,
          lote_type: reqBody.loteType,
          weight: reqBody.weight,
          lote_amount: reqBody.loteAmount,
          quantity: reqBody.quantity,
          validity: reqBody.validity,
        },
      });
    }
  }

  async adjustQuantity(userId, productId, reqBody) {
    const product = await this.findProductById(productId, userId);

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
    const product = await this.findProductById(id, userId);

    return prisma.$transaction(async (tx) => {
      await prisma.product.delete({
        where: { id },
      });

      await ShelfService.updateShelfFullStatus(product.shelf_id, tx);
    });
  }

  async findProductById(id, userId) {
    const product = await prisma.product.findFirst({
      where: { id, user_id: userId },
    });
    if (!product) {
      throw new ProductError("Produto não encontrado ou não possui permissão para acessá-lo.", 404);
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
        user_id: userId,
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

  async searchProductByName(userId, search) {
    const products = await prisma.product.findMany({
      where: {
        user_id: userId,
        name: {
          contains: search,
        },
      },
    });

    if (products.length === 0) {
      throw new ProductError("Não foi encontrado nenhum produto.", 404);
    }

    return products;
  }

  async searchTemplateByName(search) {
    const templates = await prisma.productTemplate.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });

    if (templates.length === 0) {
      throw new ProductError("Não foi encontrado nenhuma template.", 404);
    }

    return templates;
  }

  async searchProductByEanTemplate(userId, ean) {
    const products = await prisma.product.findMany({
      where: {
        user_id: userId,
        template_id: ean,
      },
    });

    if (products.length === 0) {
      throw new ProductError(`Não existe nenhum produto com o seguinte EAN: ${ean}`, 404);
    }

    return products;
  }

  async verifyProductAlreadyExist(userId, name, type, ean) {
    const product = await prisma.product.findFirst({
      where: { user_id: userId, name: name, type: type, template_id: ean },
    });

    if (product) {
      throw new ProductError("Produto já registrado!", 400);
    }
  }
}

export default new ProductService();
