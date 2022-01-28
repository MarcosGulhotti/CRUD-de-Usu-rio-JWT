import { Request, Response } from "express";
import DeleteUserService from "../services/deleteUser.service";

class DeleteUsersController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const token = request.headers.authorization;

    if (token === undefined) {
      return response.status(401).json({ message: "Missing Token" });
    }

    const deleteUserService = new DeleteUserService();
    try {
      const deletedUser = await deleteUserService.execute({ id, token });
      return response.json(deletedUser);
    } catch (error: any) {
      return response.status(401).json({ message: error.message });
    }
  }
}

export default DeleteUsersController;
