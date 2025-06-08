import jwt from "jsonwebtoken";
import UserService from "./UserService.js";
import { UserError } from "../error/Error.js";

class AuthService {
  async authentication(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization || authorization == undefined) {
      throw new UserError("É preciso estar logado!", 401);
    }

    const [, token] = authorization.split(" ");

    const data = jwt.decode(token, process.env.JWT_SECRET);
    const { userId, email } = data;

    await UserService.findById(userId);

    req.userId = userId;
    req.email = email;
    next();
  }

  verifyHavePermission(tokenId, userId) {
    if (tokenId != userId) {
      throw new UserError(
        "você não possui permissão para acessar/alterar informações de outro usuário!",
        403
      );
    }
  }
}

export default new AuthService();
