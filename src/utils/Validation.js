import { UserError } from "../error/Error.js";
import { product_type, product_lote_type } from "@prisma/client";

class Validation {
  validatePasswordAndEmail(email, password) {
    if (!password || !email) {
      throw new UserError("Email ou senha estão em branco!", 400);
    }

    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()[\]{}<>#^~+=_.,:;|\\\/-])[A-Za-z\d@$!%*?&()[\]{}<>#^~+=_.,:;|\\\/-]{8,}$/;

    if (!emailPattern.test(email)) {
      throw new UserError("O email é inválido!", 400);
    }

    if (!passwordPattern.test(password)) {
      throw new UserError(
        "A senha deve ter no mínimo 8 caracteres sendo ao menos uma letra maiúscula, uma minúscula, um número e um caracter especial!",
        400
      );
    }
  }

  validateTypeAndLoteType(reqBody, defaultType = product_type.GENERICO, defaultLotType = product_lote_type.UNIDADE) {
    const type = reqBody.type;
    const loteType = reqBody.loteType;

    const validTypes = Object.values(product_type);
    const validLotetypes = Object.values(product_lote_type);

    if (!type || !validTypes.includes(type)) {
      reqBody.type = defaultType;
    }

    if (!loteType || !validLotetypes.includes(loteType)) {
      reqBody.loteType = defaultLotType;
    }
  }
}

export default new Validation();
