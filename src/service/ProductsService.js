import { PrismaClient } from "@prisma/client"


class ProductsService {
    async createProduct(reqBody) {

        const product = await Prisma.product.create({
            data: {
                name: reqBody.name,
                description: reqBody.description,
                type: reqBody.type,
                lote_type: reqBody.lote_type,
                weight: reqBody.weight,
                lote_amount: reqBody.lote_amount,
                quantity: reqBody.quantity,
                validity: reqBody.validity,
                colum: reqBody.colum,
                row: reqBody.row,
                created_date: reqBody.created_date,
                updated_date: reqBody.updated_date,
                image: reqBody.image,
            }
        })

        return product;
    }
}