import prisma from "../../prisma/prismaClient.js";
import { UserError } from "../error/Error.js";

class ProductService {
    async Registerproduct(reqBody,) {
        await this.findProductID(reqBody.id);

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
                column: reqBody.colum,
                row: reqBody.row,
                created_date: reqBody.created_date,
                updated_date: reqBody.updated_date,
                image: reqBody.image,
                user_id: user.user_id,

            }
        })

        return product;
    }
    async updadeProduct(reqBody, user) {

        const product = await prisma.product.update({
            where: { id },
            data: {
                name: reqBody.name,
                description: reqBody.description,
                type: reqBody.type,
                lote_type: reqBody.lote_type,
                weight: reqBody.weight,
                lote_amount: reqBody.lote_amount,
                quantity: reqBody.quantity,
                validity: reqBody.validity,
                column: reqBody.colum,
                row: reqBody.row,
                created_date: reqBody.created_date,
                updated_date: reqBody.updated_date,
                image: reqBody.image,
                user_id: user.user_id,

            }
        })
        return product;
    }

    async deleteProduct(reqBody) {
        await this.findProductsID(reqBody.id)
        await prisma.product.delete({
            where: { id },
        });
    }

    async findProductID(id) {
        const product = await prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new UserError("Produto nao encontrado !", 404);
        }
        return product;
    }

}
export default new ProductService();