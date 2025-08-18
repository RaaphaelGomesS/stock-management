import UserService from "../service/UserService.js";

class UserController {
  async registerUser(req, res, next) {
    try {
      const { name, email, password } = req.validatedBody;
      const user = await UserService.createUser(name, email, password);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await UserService.findById(req.userId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const userId = parseInt(req.params.id);
      const { name, email, password } = req.validatedBody;

      const user = await UserService.updateUser(userId, name, email, password);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userId = parseInt(req.params.id);

      await UserService.deleteUser(userId);

      res.status(204);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.validatedBody;
      const token = await UserService.login(email, password);

      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
