import { UserError } from "../error/Error.js";
import { type, lote_type } from "@prisma/client";

class Validation {
  validatePasswordAndEmail(email, password) {
    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailPattern.test(email)) {
      throw new UserError("O email é inválido!", 400);
    }

    if (!password) {
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()[\]{}<>#^~+=_.,:;|\\\/-])[A-Za-z\d@$!%*?&()[\]{}<>#^~+=_.,:;|\\\/-]{8,}$/;

      if (!passwordPattern.test(password)) {
        throw new UserError(
          "A senha deve ter no mínimo 8 caracteres sendo ao menos uma letra maiúscula, uma minúscula, um número e um caracter especial!",
          400
        );
      }
    }
  }

  validateTypes(reqBody, defaultType = type.GENERICO, defaultLotType = lote_type.UNIDADE) {
    const typeReq = reqBody.type;
    const loteType = reqBody.loteType;

    const validTypes = Object.values(type);
    const validLotetypes = Object.values(lote_type);

    if (!typeReq || !validTypes.includes(type)) {
      reqBody.type = defaultType;
    }

    if (!loteType || !validLotetypes.includes(loteType)) {
      reqBody.loteType = defaultLotType;
    }
  }
}

export default new Validation();
