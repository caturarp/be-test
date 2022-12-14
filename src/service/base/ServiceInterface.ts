import {NextFunction, Request, Response, } from "express";

export interface IService{
    index(req: Request, res: Response, next:NextFunction): Response | Promise<void>
    create(req:Request, res: Response): Response | Promise<Response>
    show(req: Request, res: Response): Response | Promise<Response>
    update(req: Request, res: Response): Response | Promise<Response>
    delete(req: Request, res: Response): Response | Promise<void>
}