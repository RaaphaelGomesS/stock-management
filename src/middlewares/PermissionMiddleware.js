import { UserError } from "../error/Error.js";

export function verifyUserPermission(req, res, next) {
  if (req.userId !== parseInt(req.params.id, 10)) {
    next(new UserError("Você não tem permissão para acessar ou modificar os dados de outro usuário.", 403));
  }
  return next();
}
