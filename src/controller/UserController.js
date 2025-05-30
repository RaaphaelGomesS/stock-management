import UserService from "../service/UserService.js";

class UserController {
  async registerUser(req, res, next) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
