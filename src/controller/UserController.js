import UserService from "../service/UserService.js";

class UserController {
  async registerUser(req, res, next) {
    try {
      const {name, email, password} = req.body;
      const user = await UserService.createUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const token = 
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
