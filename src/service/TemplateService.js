import prisma from "../../prisma/prismaClient.js";

class ProductTemplate {
  async createProductTemplate(reqBody, imageUrl, prismaTx) {
    const db = prismaTx || prisma;

    return await db.productTemplate.create({
      data: {
        ean: reqBody.ean,
        name: reqBody.name,
        description: reqBody.description,
        type: reqBody.type,
        lote_type: reqBody.loteType,
        lote_amount: reqBody.loteAmount,
        image: imageUrl,
      },
    });
  }

  async findTemplateByEan(ean) {
    const template = prisma.productTemplate.findUnique({
      where: { ean },
    });

    if (!template) {
      throw new ProductError("Template não encontrado!", 404);
    }

    return template;
  }
}

export default new ProductTemplate();
