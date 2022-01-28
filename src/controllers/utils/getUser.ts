import { IJwtDecode } from "../../types";
import jwt_decode from "jwt-decode";

export const decodeToken = (token: string) => {
  try {
    const user: IJwtDecode = jwt_decode(token);
    return user.user;
  } catch (error) {
    throw new Error("Missing Token");
  }
};
