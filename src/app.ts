import express from "express"
import { Application, Request, Response } from "express"
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import {config as dotenv} from "dotenv";
import { sequelize } from './instance/sequelize';
import models from "./db/models/Index";
import UserController from "@service/user/UserController";
import AuthController from "@service/auth/AuthController";
import PostController from "@service/post/PostController";

export class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.connectDB();
        this.routes();
        dotenv();
    }
    
    protected plugins(){
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(compression())
    }
    protected routes(): void {

        this.app.use("/auth/login",  AuthController);
        this.app.use("/auth", UserController);
        this.app.use("/user", UserController);
        this.app.use("/post", PostController);
        
    }
    protected async connectDB(): Promise<void> {
        sequelize.authenticate().then(() => {
            console.log("Connection has been established successfully.");
          })
            .catch((err:Error) => {
              console.error("Unable to connect to the database:", err);
            });
          sequelize.addModels(models)
          console.log("await sync");
          
          await sequelize.sync({ alter: true});
    }
}