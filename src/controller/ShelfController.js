import ShelfService from "../service/ShelfService.js";

class ShelfController {
  async getAllShelvesInStock(req, res, next) {
    try {
      const stockId = req.params.id;

      const shelves = await ShelfService.getAllShelves(req.userId, stockId);

      res.status(200).json(shelves);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const id = req.params.id;
      const shelf = await ShelfService.findById(id);

      res.status(200).json(shelf);
    } catch (error) {
      next(error);
    }
  }

  async createShelf(req, res, next) {
    try {
      const newShelf = await ShelfService.createShelf(req.body);

      res.status(201).json(newShelf);
    } catch (error) {
      next(error);
    }
  }

  async updateShelf(req, res, next) {
    try {
      const id = req.params.id;
      const updatedShelf = await ShelfService.updateShelf(id, req.body);

      res.status(200).json(updatedShelf);
    } catch (error) {
      next(error);
    }
  }

  async deleteShelf(req, res, next) {
    try {
      const id = req.params.id;
      await ShelfService.deleteShelf(id);

      res.status(200).json({ message: `Estante:${id}, deletado com sucesso!` });
    } catch (error) {
      next(error);
    }
  }

    async getShelfLayout(req, res, next) {
    try {
      const id = req.params.id;
      const layout = await ShelfService.createShelfLayout(id);

      res.status(200).json(layout);
    } catch (error) {
      next(error);
    }
  }
}

export default new ShelfController();
