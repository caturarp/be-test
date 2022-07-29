import { NextFunction, Request, Response } from "express";
import { IService } from "../../service/base/ServiceInterface";
import Post from "../../db/models/Post";
import User from "../../db/models/User";
import {Op} from "sequelize";
// import db from "@models";

class PostService implements IService {
    index = async (req: Request , res: Response, next: NextFunction) => {

        Post.findAll({ include: [User] })
            .then(users => res.status(200).json(users)
            ).catch(next)
    }
    
    create = async (req: Request, res: Response):Promise<Response>=> {
        let postDetails = req.body;
        try {
            const addPost = await Post.create(postDetails, {include: [User]})
            return res.status(200).json({
                success: 'true',
                message: "Successfully Create Post",
                data: Post
            })
        } catch (err) {
            return res.status(500).json({
                success: 'false',
                message: err,
                data: null
            })
        }
              
    }
    show = async (req: Request , res: Response ): Promise<Response> => {
        const {limit} = req.body;
        query: req.query
        Post.findAll({
            limit: limit, 
            where: {search: query.search},
                tag: {
                    [Op.or]: [].concat(req.query.tag)
                  }},
            include: [User] })
            .then(posts => res.status(200).json(posts)
            ).catch(next)

        if(!person){
            return res.status(404).send(`Post tidak ditemukan`);
        }

        return res.status(200).send(person) ;
    }
    update = async (req: Request , res: Response ): Promise<Response> => {
        const { id } = req.params;
        const data = req.body;
        let post = await Post.findOne({where: {id}});
        if(!post){
            return res.status(404).send(`Data not found`);
        }
        try {
            let updatedPost = await Post.update(
                data,
                { where: { id } }
            )
            return res.status(200).json({
                success: 'true',
                message: "Successfully Update Post",
                data: updatedPost
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
        let isPostAvailable = await User.findOne({
            where: { id }
        });
        if (!isPostAvailable){
            res.status(404).send(`Data not found.`)
        }
        User.destroy({where: {id}})
            .then((data)=>{
                res.status(200).json({
                    success: 'true',
                    message: "Successfully Delete Post",
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

export default new PostService();