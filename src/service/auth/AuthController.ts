import { Router, Request, Response } from "express";
import BaseController from "../base/BaseController";
import AuthService from "./AuthService";
import {auth} from "../../middleware/auth"

class AuthController extends BaseController{
    public routes(): void{
        this.router.get("/", AuthService.signup);
        this.router.get("/:id", auth, AuthService.signin);
    }
}

export default new AuthController().router;