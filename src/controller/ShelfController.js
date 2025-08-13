import ShelfService from "../service/ShelfService.js";

class ShelfController {
  async getAllShelvesInStock(req, res, next) {
    try {
      const stockId = parseInt(req.params.id);

      const shelves = await ShelfService.getAllShelves(req.userId, stockId);

      res.status(200).json(shelves);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const shelfId = parseInt(req.params.id);

      const shelf = await ShelfService.findById(req.userId, shelfId);

      res.status(200).json(shelf);
    } catch (error) {
      next(error);
    }
  }

  async createShelf(req, res, next) {
    try {
      const newShelf = await ShelfService.createShelf(req.body, req.userId);

      res.status(201).json(newShelf);
    } catch (error) {
      next(error);
    }
  }

  async updateShelf(req, res, next) {
    try {
      const shelfId = parseInt(req.params.id);
      const updatedShelf = await ShelfService.updateShelf(shelfId, req.userId, req.body);

      res.status(200).json(updatedShelf);
    } catch (error) {
      next(error);
    }
  }

  async deleteShelf(req, res, next) {
    try {
      const shelfId = parseInt(req.params.id);

      await ShelfService.deleteShelf(shelfId, req.userId);

      res.status(200).json({ message: `Estante:${id}, deletado com sucesso!` });
    } catch (error) {
      next(error);
    }
  }

  async getShelfLayout(req, res, next) {
    try {
      const shelfId = parseInt(req.params.id);

      const layout = await ShelfService.createShelfLayout(shelfId, req.userId);

      res.status(200).json(layout);
    } catch (error) {
      next(error);
    }
  }
}

export default new ShelfController();
