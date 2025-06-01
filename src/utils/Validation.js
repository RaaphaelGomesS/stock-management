import { UserError } from "../error/Error.js";

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
}

export default new Validation();
