import { Request, Response } from "express";
import CreateUserService from "../services/createUser.service";

class CreateUserController {
  async handle(req: Request, resp: Response) {
    try {
      const { name, email, password, isAdm } = req.body;

      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
        name,
        email,
        password,
        isAdm,
      });

      return resp.status(201).json(user.serialize());
    } catch (error: any) {
      return resp.status(400).json({ message: error.message });
    }
  }
}

export default CreateUserController;
