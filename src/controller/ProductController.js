import ProductService from "../service/ProductService";

class ProductContoll {
    async Registerproduct(req, res, next) {
        try {
            const product = await ProductService.Registerproduct(req);
            res.status(201).json(product)
        } catch (error) {
            next(error);
        }

    }
    async findProductID(req, res, next) {
        try {
            const product = await ProductService.findProductID(req);
            res.status(201).json(product)
        } catch (error) {
            next(error);
        }
    }
    async updadeProduct(req, res, next) {
        try {
            const product = await ProductService.updadeProduct(req);
            res.status(201).json(product)
        } catch (error) {
            next(error);
        }
    }
    async deleteProduct(req, res, next) {
        try {
            const product = await ProductService.deleteProduct(req);
            res.status(201).json(product)
        } catch (error) {
            next(error);
        }

    }


}
export default new ProductContoll();
