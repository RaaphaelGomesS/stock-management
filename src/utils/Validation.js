import { UserError } from "../error/Error.js";
import { type, lote_type } from "@prisma/client";

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

  validateShelfData(data) {
    if (!data.stockId || !data.columns || !data.rows || !data.destination) {
      throw new ShelfError("Campos obrigatórios da prateleira estão faltando!", 400);
    }

    if (data.columns <= 0 || data.rows <= 0) {
      throw new ShelfError("Colunas e linhas devem ser maiores que zero!", 400);
    }
  }
}

export default new Validation();
