import express, { Express, Request, Response } from "express";
import "reflect-metadata";
import { connectDataBase } from "./database";
import router from "./routes";

connectDataBase();

const app: Express = express();

app.use(express.json());
app.use(router)

export default app;
