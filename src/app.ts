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

        // this.app.use("/users",  UserController);
        // this.app.use("/auth", AuthController);
        // this.app.use("/roles", RoleController);
        // this.app.use("/teams", TeamController);
        // this.app.use("/methodologies", MethodologyController);
        // this.app.use("/cards", CardController);
        // this.app.use("/lists", ListController);
        // this.app.use("/boards", BoardController);
        // this.app.use("/login", BoardController);

        // gmail auth routes
        // this.app.use('/', authRoutes)

        // auth middleware for api routes
        // this.app.use(authMiddleware)

        // gmail api routes
        // this.app.use('/api', apiRoutes)
        
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