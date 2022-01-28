import { Request, Response } from "express";
import UpdateUserService from "../services/updateUser.service";

class UpdateUsersController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const data = request.body;
    const token = request.headers.authorization;

    if (token === undefined) {
      return response.status(401).json({ message: "Missing Token" });
    }

    const updateUserService = new UpdateUserService();
    try {
      const user = await updateUserService.execute({ id, data, token });
      return response.json(user?.serialize());
    } catch (error: any) {
      return response.status(401).json({ message: error.message });
    }
  }
}

export default UpdateUsersController;
