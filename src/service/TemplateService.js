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
    return await prisma.productTemplate.findUnique({
      where: { ean },
    });
  }
}

export default new ProductTemplate();
