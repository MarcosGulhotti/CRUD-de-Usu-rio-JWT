import { UsersRepository } from "../repositories/users.repository";
import { getCustomRepository } from "typeorm";
import { decodeToken } from "../controllers/utils/getUser";

interface Idelete {
  id: string;
  token: string;
}

class DeleteUserService {
  async execute({ id, token }: Idelete) {
    const usersRepository = getCustomRepository(UsersRepository);
    const userToBeDeleted = await usersRepository.findOne(id);

    if (token === undefined) {
      throw new Error("Missing Token");
    }
    let userMakingRequest = decodeToken(token.split(" ")[1]);

    if (!userToBeDeleted) {
      throw new Error("User not found");
    }

    if (userMakingRequest.uuid !== userToBeDeleted.uuid) {
      if (!userMakingRequest.isAdm) {
        throw new Error("User is not an Adm");
      }
    }

    await usersRepository.delete(userToBeDeleted.uuid);

    return { message: "User deleted with success" };
  }
}

export default DeleteUserService;
