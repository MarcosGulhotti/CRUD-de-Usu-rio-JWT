import { UsersRepository } from "../repositories/users.repository";
import { getCustomRepository } from "typeorm";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWTConfig } from "../database/configs/configs";
import { IUserLogin } from "../types";

class LoginUserService {
  async execute({ email, password }: IUserLogin) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error("Missing e-mail");
    } else if (!password) {
      throw new Error("Missing Password");
    }

    const user = await usersRepository.findOne({ email });

    if (user === undefined) {
      throw new Error("User Not Exists");
    }

    try {
      const match = await bcrypt.compare(password, user.password);
      let token = jwt.sign({ user }, JWTConfig.secret, {
        expiresIn: JWTConfig.expiresIn,
      });
      if (match) {
        return token;
      }else {
        throw new Error("Password and Email missmatch")
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default LoginUserService;
