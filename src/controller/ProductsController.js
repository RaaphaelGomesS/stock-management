import ProductsService from "../service/ProductsService";

class ProductsContoll {
    async CreateProducts(req, res, next) {
        try {
            const products = await ProductsService.CreateProducts(req);
            res.status(201).json(products)
        } catch (error) {
            next(error);
        }

    }
    async findProduct(req, res, next) {
        try {
            const product = await ProductsService.findProductID(req);
            res.status(201).json(product)
        } catch (error) {
            next(error);
        }
    }
    async updadeProducts(req, res, next) {
        try {
            const products = await ProductsService.updadeProducts(req);
            res.status(201).json(products)
        } catch (error) {
            next(error);
        }
    }
    async deleteProduct(req, res, next) {
        try {
            const products = await ProductsService.deleteProduct(req);
            res.status(201).json(products)
        } catch (error) {
            next(error);
        }

    }


}
export default new ProductsContoll();
