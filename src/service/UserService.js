import prisma from "../../prisma/prismaClient.js";
import Validation from "../utils/Validation.js";
import { UserError } from "../error/Error.js";
import bcrypt from "bcrypt";

class UserService {
  async createUser(name, email, password) {

    Validation.validatePasswordAndEmail(password, email);

    await this.findUSerByEmail(email);

    const encryptPass = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: encryptPass,
      },
    });

    return user;
  }

  async findUSerByEmail(email) {
    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (user) {
      throw new UserError("Email já cadastrado!", 400);
    }
  }
}

export default new UserService();
