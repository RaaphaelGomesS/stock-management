import ShelfService from "../service/ShelfService.js"; 

class ShelfController {
  async getAll(req, res, next) {
    try {
      const shelves = await ShelfService.getAllShelves(req.userId);
      res.status(200).json(shelves);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const id  = req.params.id;
      const shelf = await ShelfService.getShelfById(id);
      res.status(200).json(shelf);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newShelf = await ShelfService.createShelf(req.body);
      res.status(201).json(newShelf);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id  = req.params.id;
      const updatedShelf = await ShelfService.updateShelf(id, req.body);
      res.status(200).json(updatedShelf);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id  = req.params.id;
      await ShelfService.deleteShelf(id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new ShelfController();
