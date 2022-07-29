import { Router, Request, Response } from "express";
import {IController}  from "./ControllerInterface";

abstract class BaseController implements IController{
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }
    
    abstract routes(): void;
}

export default BaseController;