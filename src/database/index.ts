import { createConnection } from "typeorm";

export const connectDataBase = async () => {
  return createConnection().then(() => {
    console.log("Connected");
  });
};
