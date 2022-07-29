import { Router, Request, Response } from "express";
import BaseController from "../base/BaseController";
import UserService from "./UserService";
import {auth} from "../../middleware/auth"

class UserController extends BaseController{
    public routes(): void{
        this.router.get("/", UserService.index);
        this.router.get("/:id", auth, UserService.show);
        this.router.post("/", UserService.create);
        this.router.put("/:id", UserService.update);
        this.router.put("/:id", UserService.changePassword);
        this.router.delete("/:id", UserService.delete)
    }
}

export default new UserController().router;