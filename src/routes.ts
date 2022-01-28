import { Router } from "express";
import ListUsersController from "./controllers/ listUsers.controller";
import CreateUserController from "./controllers/createUser.controller";
import DeleteUsersController from "./controllers/deleteUser.controller";
import ListUserByIdController from "./controllers/listUserById.controller";
import LoginUserController from "./controllers/loginUser.controller";
import UpdateUsersController from "./controllers/updateUser.controller";
import {
  generateHash,
  validateBody,
} from "./middlewares/createUser.middleware";
import { JwtVerify, IsAdm } from "./middlewares/listUsers.Middleware";

const router = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const listUsersController = new ListUsersController();
const listUserByIdController = new ListUserByIdController();
const updateUsersController = new UpdateUsersController();
const deleteUsersController = new DeleteUsersController();

router.post("/users", validateBody, generateHash, createUserController.handle);
router.post("/login", loginUserController.handle);
router.get("/users", JwtVerify, IsAdm, listUsersController.handle);
router.get("/users/profile", JwtVerify, listUserByIdController.handle);
router.patch("/users/:id", JwtVerify, updateUsersController.handle);
router.delete("/users/:id", JwtVerify, deleteUsersController.handle);

export default router;
