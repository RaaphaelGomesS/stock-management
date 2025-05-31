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
    async searchProducts(req, res, next) {
        try {
            const products = await ProductsService.searchProducts(req);
            res.status(201).json(products)
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
    async deleteProducts(req, res, next) {
        try {
            const products = await ProductsService.deleteProducts(req);
            res.status(201).json(products)
        } catch (error) {
            next(error);
        }

    }


}
export default new ProductsContoll();
