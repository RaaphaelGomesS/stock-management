import jwt from "jsonwebtoken";
import UserService from "./UserService.js";
import { UserError } from "../error/Error.js";

export async function authentication(req, res, next) {
  const authorization = req.headers;

  if (!authorization || authorization == undefined) {
    throw new UserError("É preciso estar logado!", 401);
  }

  const [, token] = authorization.split(" ");

  const data = jwt.decode(token, process.env.JWT_SECRET);
  const { id, email } = data;

  await UserService.findById(id);

  req.user_id = id;
  req.email = email;
  next();
}

export async function verifyHavePermission(tokenId, userId) {

    const user = UserService.findById(userId);

  if (tokenId !== user.id) {
    throw new UserError(
      "você não possui permissão para acessar/alterar informações de outro usuário!",
      403
    );
  }
}
