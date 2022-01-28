import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTConfig } from "../database/configs/configs";
import { decodeToken } from "../controllers/utils/getUser";

export const JwtVerify = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (token === undefined) {
    return res.status(401).json({ message: "Missing Token" });
  }
  jwt.verify(token, JWTConfig.secret, (err, decode) => {
    if (err) {
      return res.status(401).json({ error: "invalid token" });
    }
  });
  next();
};

export const IsAdm = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  if (token === undefined) {
    return res.status(401).json({ message: "Missing Token" });
  }
  let decodedToken = decodeToken(token.split(" ")[1]);

  try {
    if (!decodedToken.isAdm) {
      return res
        .status(401)
        .json({ message: "You doesn't have acess to this" });
    } else {
      next();
    }
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};
