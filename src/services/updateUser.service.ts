import { UsersRepository } from "../repositories/users.repository";
import { getCustomRepository } from "typeorm";
import { Iuser } from "../types";
import { decodeToken } from "../controllers/utils/getUser";
import * as bcrypt from "bcryptjs";

interface IProps {
  id: string;
  token: string;
  data: Iuser;
}

class UpdateUserService {
  async execute({ id, token, data }: IProps) {
    const usersRepository = getCustomRepository(UsersRepository);
    const userToBeUpdated = await usersRepository.findOne(id);

    if (token === undefined) {
      throw new Error("Missing Token");
    }
    let userMakingRequest = decodeToken(token.split(" ")[1]);

    if (!userToBeUpdated) {
      throw new Error("User not found");
    }
    if (data.isAdm) {
      throw new Error("You cannot change users adm permissions");
    }
    if (data.createdOn) {
      throw new Error("You cannot change createdOn");
    }
    if (data.updatedOn) {
      throw new Error("You cannot change updatedOn");
    }
    if (data.uuid) {
      throw new Error("You cannot change ID");
    }
    if (data.password) {
      const newPassword = bcrypt.hashSync(data.password, 10);
      data.password = newPassword;
    }
    if (userMakingRequest.uuid !== userToBeUpdated.uuid) {
      if (!userMakingRequest.isAdm) {
        throw new Error("User is not an Adm");
      }
    }
    if (data.email) {
      const checkIfEmailExists = await usersRepository.findOne({
        email: data.email,
      });
      if (checkIfEmailExists) {
        throw new Error("Email already exists");
      }
    }
    await usersRepository.update(id, data);

    const newUser = await usersRepository.findOne(id);

    return newUser;
  }
}

export default UpdateUserService;
