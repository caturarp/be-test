// import {AuthMiddleware as auth} from "../../middleware/AuthMiddleware";
import { Router, Request, Response } from "express";
import BaseController from "../base/BaseController";
// import UserService
import UserService from "./PostService";
import * as authentication from "@service/auth/AuthService";

class UserController extends BaseController{

    public routes(): void{
        this.router.get("/", UserService.index);
        this.router.post("/", UserService.create);
        this.router.get("/:id", UserService.show);
        this.router.put("/:id", UserService.update);
        this.router.delete("/:id", UserService.delete);
        // this.router.get("/", async(req: Request, res: Response) =>{
        //     try {
        //         // res.status(201).json(user);
        //         res.status(201).send("get All");

        //       } catch (e) {
        //           res.status(500).send(e);

        //           console.log('Error:',e);
        //       }
        // })
        // this.router.post("/", async(req: Request, res: Response) =>{
        //     try {
        //         // res.status(201).json(user);
        //         const info = req.body
        //         res.status(201).send(info);

        //       } catch (e) {
        //           res.status(500).send(e);

        //           console.log('Error:',e);
        //       }
        // })
    }
}

export default new UserController().router;