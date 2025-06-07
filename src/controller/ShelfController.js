import ShelfService from "../service/ShelfService.js"; 

class ShelfController {
  async getAll(req, res, next) {
    try {
      const shelves = await ShelfService.getAllShelves();
      res.json(shelves);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const shelf = await ShelfService.getShelfById(id);

      if (!shelf) {
        return res.status(404).json({ message: "Shelf not found" });
      }

      res.json(shelf);
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
      const { id } = req.params;
      const updatedShelf = await ShelfService.updateShelf(id, req.body);
      res.json(updatedShelf);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await ShelfService.deleteShelf(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new ShelfController();
