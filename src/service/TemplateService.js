import prisma from "../../prisma/prismaClient.js";

class ProductTemplate {
  async createProductTemplate(validatedBody, imageUrl, prismaTx) {
    const db = prismaTx || prisma;

    return await db.productTemplate.create({
      data: {
        ean: validatedBody.ean,
        name: validatedBody.name,
        description: validatedBody.description,
        type: validatedBody.type,
        loteType: validatedBody.loteType,
        loteAmount: validatedBody.loteAmount,
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
