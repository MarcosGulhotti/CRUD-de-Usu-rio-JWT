import { EntityRepository, Repository } from "typeorm";
import { Users } from "../entities";

@EntityRepository(Users)
class UsersRepository extends Repository<Users> {}

export { UsersRepository };