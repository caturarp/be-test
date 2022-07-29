import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//check existence and validity of token before allowing the request to continue
export const auth   = (req: Request, res: Response, next: NextFunction): any => {
    const authHeader = req.get('Authorization');
    if(!authHeader){       
        return res.status(401).send('Not authenticated')
    }
    const token = authHeader.split(' ')[1];
    let secretKey = process.env.JWT_SECRET_KEY || "secret";
    try{
        const credential:string | object = jwt.verify(token, secretKey);
        if(credential) {
            req.app.locals.credential = credential;
            next();
        }
        return res.status(400).send("Not authenticated")
    } catch(error){
        return res.send(error)
    }
};