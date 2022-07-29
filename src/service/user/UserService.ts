import { Request, Response } from "express";
import { IService } from "../../service/base/ServiceInterface";
import { IsEmail, NotNull } from "sequelize-typescript";
import User from "../../db/models/User";
import Post from "../../db/models/Post";

class UserService implements IService{
    index = async (req: Request , res: Response ) => {
        try {
            const user: User[] = await User.findAll({include: [User]})
            res.status(200).json({
                user
            })
        } catch (err) {
            res.status(500).send("Error: " + err)
        }
    }
    create = async (req: Request , res: Response ): Promise<Response> => {
        let email = req.body.email;
        
        let userBefore = await User.findOne({
            where: { email }
        });
        if (userBefore){
            return res.status(400).json({
            success: 'false',
            message: "Duplicate Email",
            data: null
            })
        }
        let data = req.body;
            try {
                const addUser = await User.create(data)
                return res.status(200).json({
                    success: 'true',
                    message: "Your account has been successfully created",
                    data: addUser
                })
            } catch (err) {
                return res.status(500).json({
                    success: 'false',
                    message: err,
                    data: null
                    })
            }
        
        
                
        // const hashedPassword:string = await PasswordHash.passwordHash(password);  
    }

    show = async (req: Request , res: Response ): Promise<Response> => {
        const {id} = req.params;
        let user = await User.findOne({
            where: { id }
        });
        if(!user){
            return res.status(404).send(`Data not found.`);
        }
        try {
            return res.status(200).json({
                success: 'true',
                message: "Successfully Get User",
                data: user
            }) 
        } catch (err) {
            return res.status(500).json({
                success: 'false',
                message: err,
                data: null
                })
        }
    }

    update = async (req: Request , res: Response ): Promise<Response> => {
        const {id} = req.params;
        const {name, email, username, photo} = req.body;
        
        let userBefore = await User.findOne({
            where: { id }
        });

        if (!userBefore){
            return res.status(404).send(`Data not found.`);
        }
        try {
            let userAfter = await User.update({ name, email, username, photo }, { where: { id } });
            return res.status(200).json({
                success: 'true',
                message: "Successfully Update User",
                updatedAt: new Date().toISOString(),
                data: userAfter
            }) 
        } catch (err) {
            return res.status(500).json({
                success: 'false',
                message: err,
                data: null
                })
        }
    }
    changePassword = async (req: Request , res: Response ): Promise<Response> => {
        const {id} = req.params;
        const {password} = req.body;
        
        let userBefore = await User.findOne({
            where: { id }
        });

        if (!userBefore){
            return res.status(404).send(`Data not found.`);
        }
        try {
            let userAfter = await User.update({ password }, { where: { id } });
            return res.status(200).json({
                success: 'true',
                message: "Successfully Change Password",
                data: null
            }) 
        } catch (err) {
            return res.status(500).json({
                success: 'false',
                message: err,
                data: null
                })
        }
    }

    delete = async (req: Request , res: Response ) => {
        const {id} = req.params;
        let isUserAvailable = await User.findOne({
            where: { id }
        });
        if (!isUserAvailable){
            res.status(404).send(`User doesn't exist.`)
        }
        User.destroy({where: {id}})
            .then((data)=>{
                res.status(200).json({
                    success: 'true',
                    message: "Successfully Delete User",
                    data: null
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    success: 'false',
                    message: err,
                    data: null
                    })
                })
    }
    
}

export default new UserService();