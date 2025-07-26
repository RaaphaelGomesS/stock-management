import prisma from "../../prisma/prismaClient.js";

class ProductTemplate {
  async createProductTemplate(reqBody) {
    return await prisma.productTemplate.create({
      data: {
        ean: reqBody.ean,
        name: reqBody.name,
        description: reqBody.description,
        type: reqBody.type,
        lote_type: reqBody.loteType,
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
