import { Request, Response } from "express";
import ListUsersService from "../services/listUsers.service";

class ListUsersController {
  async handle(req: Request, resp: Response) {
    const listUsersService = new ListUsersService();

    const users = await listUsersService.execute();

    return resp.json(users);
  }
}

export default ListUsersController;
