export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

export interface Iuser {
  uuid: string;
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  createdOn: string;
  updatedOn: string;
}

export interface IJwtDecode {
  user: Iuser;
  iat: number;
  exp: number;
}
