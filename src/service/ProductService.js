import prisma from "../../prisma/prismaClient.js";
import Validation from "../utils/Validation.js";
import { ProductError } from "../error/Error.js";
import TemplateService from "./TemplateService.js";
import ShelfService from "./ShelfService.js";

class ProductService {
  async registerProduct(userId, validatedBody, validatedFile) {
  
    await this.verifyProductAlreadyExist(userId, validatedBody.name, validatedBody.type, validatedBody.ean);

    await ShelfService.verifyCanPutProduct(validatedBody.shelfId, validatedBody.row, validatedBody.column);

    try {
      const newProduct = await prisma.$transaction(async (tx) => {
        const imageUrl = validatedFile ? `/uploads/${validatedFile.filename}` : null;

        let template = await tx.productTemplate.findUnique({
          where: { ean: validatedBody.ean },
        });

        if (!template) {
          template = await TemplateService.createProductTemplate(validatedBody, imageUrl, tx);
        }

        const createProduct = await tx.product.create({
          data: {
            name: validatedBody.name,
            description: template.description,
            type: template.type,
            lote_type: template.loteType,
            weight: validatedBody.weight,
            lote_amount: validatedBody.loteAmount,
            quantity: validatedBody.quantity,
            validity: validatedBody.validity,
            column: validatedBody.column,
            row: validatedBody.row,
            image: imageUrl,
            user_id: userId,
            shelf: {
              connect: {
                id: validatedBody.shelfId,
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

  async updateProduct(id, userId, validatedBody, validatedFile) {

    const product = await this.findProductById(id, userId);

    const imageUrl = validatedFile ? `/uploads/${validatedFile.filename}` : null;

    if (
      validatedBody.shelfId !== product.shelf_id ||
      validatedBody.row !== product.row ||
      validatedBody.column !== product.column
    ) {
      await ShelfService.verifyCanPutProduct(validatedBody.shelfId, validatedBody.row, validatedBody.column);

      try {
        return prisma.$transaction(async (tx) => {
          const updatedProduct = await tx.product.update({
            where: { id },
            data: {
              name: validatedBody.name,
              description: validatedBody.description,
              type: validatedBody.type,
              lote_type: validatedBody.loteType,
              weight: validatedBody.weight,
              lote_amount: validatedBody.loteAmount,
              quantity: validatedBody.quantity,
              validity: validatedBody.validity,
              column: validatedBody.column,
              row: validatedBody.row,
              image: imageUrl,
              shelf: {
                connect: {
                  id: validatedBody.shelfId,
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
          name: validatedBody.name,
          description: validatedBody.description,
          type: validatedBody.type,
          lote_type: validatedBody.loteType,
          weight: validatedBody.weight,
          lote_amount: validatedBody.loteAmount,
          quantity: validatedBody.quantity,
          validity: validatedBody.validity,
          image: imageUrl
        },
      });
    }
  }

  async adjustQuantity(userId, productId, validatedBody) {
    const product = await this.findProductById(productId, userId);

    const quantityWithAdjust = product.quantity + parseInt(validatedBody.adjustment);

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
    return await prisma.product.findMany({
      where: {
        shelf_id: shelfId,
      },
    });
  }

  async productHistorical(userId) {
    return await prisma.product.findMany({
      take: 5,
      where: {
        user_id: userId,
      },
      orderBy: {
        updated_date: "desc",
      },
    });
  }

  async searchProductByName(userId, search) {
    return await prisma.product.findMany({
      where: {
        user_id: userId,
        name: {
          contains: search,
        },
      },
    });
  }

  async searchTemplateByName(search) {
    return await prisma.productTemplate.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
  }

  async searchProductByEanTemplate(userId, ean) {
    return await prisma.product.findMany({
      where: {
        user_id: userId,
        template_id: ean,
      },
    });
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
