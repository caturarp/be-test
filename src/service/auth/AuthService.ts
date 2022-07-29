import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IService } from "@service/base/ServiceInterface";
import User from "src/db/models/User";
class AuthService {
    signup = (req:Request, res:Response) => {
        const { name, email, password } = req.body;
        // Verifying if one of the fields is Empty
        if (!name || !password || !email) {
            return res.json({ error: "Please submit all required field" });
        }
        // Else we search the user with the credentials submitted
        User.findOne({ where: {email} })
            .then((savedUser) => {
                // Verify if the user exist in the DB
                if (savedUser) {
                    return res.json({ error: "This Email Is Already Used !" });
                }
                // We Hash the pwd before save into DB, more the number is high more it's more secure
                bcrypt.hash(password, 12).then((hashedPwd) => {
                    const user = new User({
                        Name: name,
                        Email: email,
                        Password: hashedPwd,
                    });
                    // We save our new user to DB
                    user.save()
                        .then((user) => {
                            // // after saving the user into DB we send a confirmation email
                            // const email = {
                            // 	from: "no-reply@insta-clone.com",
                            // 	to: user.Email,
                            // 	subject: "Your account has been created successfully",
                            // 	html: "<h1>Welcome to InstaClone</h1>",
                            // };
                            // sgMail.send(email);
                            res.json({ message: "Saved successfully " });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    signin = (req, res) => {
        const { email, password } = req.body;
        // Verification for an empty field
        if (!email || !password) {
            return res.json({ error: "Please provide Email or Password" });
        }
        // Check if email exist in our DB
        User.findOne({ Email: email })
            .then((savedUser) => {
                if (!savedUser) {
                    return res.json({ error: "Invalid Email or Password" });
                }
                bcrypt.compare(password, savedUser.Password).then((doMatch) => {
                    if (doMatch) {
                        // we will generate the token based on the ID of user
                        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
                        // retrieve the user info details and send it to the front
                        const { _id, Name, Email, Followers, Following, Bookmarks } = savedUser;
                        res.json({ token, user: { _id, Name, Email, Followers, Following, Bookmarks } });
                    } else {
                        return res.json({
                            error: "Invalid Email or Password",
                        });
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
}
export default new AuthService();