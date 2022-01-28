import { UsersRepository } from "../repositories/users.repository";
import { getCustomRepository } from "typeorm";
import { IUserRequest } from "../types";

class CreateUserService {
  async execute({ name, email, password, isAdm }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error("Missing e-mail");
    }

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("E-mail already registered");
    }

    const user = usersRepository.create({ name, email, password, isAdm });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
