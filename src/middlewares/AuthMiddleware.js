import jwt from "jsonwebtoken";
import { UserError } from "../error/Error.js";
import UserService from "../service/UserService.js";

export async function authentication(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || authorization == undefined) {
      throw new UserError("É preciso estar logado.", 401);
    }

    const [, token] = authorization.split(" ");

    const data = jwt.decode(token, process.env.JWT_SECRET);

    if (!data || !data.userId) {
      throw new UserError("token inválido ou expirado.", 401);
    }

    const { userId, email } = data;

    await UserService.findById(userId);

    req.userId = userId;
    req.email = email;
    next();
  } catch (error) {
    if (error instanceof UserError && error.statusCode === 404) {
      next(new UserError("Token inválido. O usuário associado ao token não foi encontrado.", 401));
    } else {
      next(error);
    }
  }
}
