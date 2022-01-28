import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/users.repository";

export class ListUserById {
  async execute(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = usersRepository.findOne(id);

    return user;
  }
}
export default ListUserById;
