import prisma from "../../prisma/prismaClient.js";
import Validation from "../utils/Validation.js";
import { UserError } from "../error/Error.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserService {
  async createUser(name, email, password) {
    Validation.validatePasswordAndEmail(email, password);

    await this.verifyUserAlreadyExist(email);

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

  async login(email, password) {
    const user = await this.findByEmail(email);
    const isValidatedPassword = await bcrypt.compare(password, user.password);

    if (!isValidatedPassword) {
      throw new UserError("A senha está incorreta!", 400);
    }

    return jwt.sign(
      {
        user_id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
  }

  async verifyUserAlreadyExist(email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new UserError("Email já cadastrado!", 400);
    }
  }

  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UserError("Usuário não cadastrado!", 400);
    }
    return user;
  }

  async findById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new UserError("Usuário não encontrado!", 404);
    }
    return user;
  }
}

export default new UserService();
