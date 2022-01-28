import { Request, Response } from "express";
import ListUserById from "../services/listUserById.service";
import { decodeToken } from "./utils/getUser";

class ListUserByIdController {
  async handle(req: Request, resp: Response) {
    let token = req.headers.authorization?.split(" ")[1];

    if (token === undefined) {
      return resp.status(401).json({ message: "Missing Token" });
    }

    let decodedToken = decodeToken(token);

    const listUserById = new ListUserById();

    const user = await listUserById.execute(decodedToken.uuid);

    return resp.json(user);
  }
}

export default ListUserByIdController;
