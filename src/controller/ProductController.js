import ProductsService from "../service/ProductService";

class ProductsContoll {
    async Registerproduct(req, res, next) {
        try {
            const products = await ProductsService.Registerproduct(req);
            res.status(201).json(products)
        } catch (error) {
            next(error);
        }

    }
    async findProductID(req, res, next) {
        try {
            const product = await ProductsService.findProductID(req);
            res.status(201).json(product)
        } catch (error) {
            next(error);
        }
    }
    async updadeProduct(req, res, next) {
        try {
            const products = await ProductsService.updadeProduct(req);
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
