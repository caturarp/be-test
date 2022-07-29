import { Router, Request, Response } from "express";
import BaseController from "../base/BaseController";
import UserService from "./UserService";
import {auth} from "../../middleware/auth" // not used since {auth} not finished

class UserController extends BaseController{
    public routes(): void{
        this.router.get("/", UserService.index);
        this.router.get("/:id", UserService.show);
        this.router.post("/register", UserService.create);
        this.router.put("/:id", UserService.update);
        this.router.put("/change-password/:id", UserService.changePassword);
        this.router.delete("/:id", UserService.delete)
    }
}

export default new UserController().router;