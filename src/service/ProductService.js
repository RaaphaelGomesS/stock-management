import prisma from "../../prisma/prismaClient.js";
import Validation from "../utils/Validation.js";
import { ProductError, UserError } from "../error/Error.js";
import TemplateService from "./TemplateService.js";

class ProductService {
  async registerProduct(userId, reqBody) {
    Validation.validateTypes(reqBody);

    await this.verifyProductAlreadyExist(userId, reqBody.name, reqBody.type);

    let template = await TemplateService.findTemplateByEan(reqBody.ean);

    if (!template) {
      template = await TemplateService.createProductTemplate(reqBody);
    }

    const product = await prisma.product.create({
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

    return product;
  }

  async updadeProduct(id, userId, reqBody) {
    const product = await this.findProductById(id);

    if (product.user_id != userId) {
      throw new UserError("Não possui permissão para alterar esse produto!", 401);
    }

    const updatedProduct = await prisma.product.update({
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

    return updatedProduct;
  }

  async deleteProduct(userId, id) {
    await this.findProductById(id);

    if (product.user_id != userId) {
      throw new UserError(
        "Não possui permissão para alterar esse produto!",
        401
      );
    }

    await prisma.product.delete({
      where: { id },
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
