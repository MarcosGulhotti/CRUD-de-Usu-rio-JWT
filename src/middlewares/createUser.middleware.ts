import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcryptjs";

export const validateBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, isAdm } = req.body;
  if (typeof name !== "string") {
    return res.status(400).json({ error: "name needs to be a string" });
  } else if (typeof email !== "string") {
    return res.status(400).json({ error: "email needs to be a string" });
  } else if (typeof password !== "string") {
    return res.status(400).json({ error: "password needs to be a string" });
  } else if (typeof isAdm !== "boolean") {
    return res.status(400).json({ error: "isAdm needs to be a boolean" });
  }
  next();
};

export const generateHash = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;

  const newPassword = bcrypt.hashSync(password, 10);

  req.body.password = newPassword;

  next();
};
