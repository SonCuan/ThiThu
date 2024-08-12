import { decode } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const checkPermission = async (req, res , next  ) => { 
    try {
        if(!req.headers.authorization){
            return res.status(401).json({
                message : "Ban chua dang nhap"
            })
        }
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message:  "Ban chua dang nhap",
            })
        }
        const decode = jwt.verify(token, "quanns");
        if(!decode){
            return res.status(401).json({
                message : "Token ko hop le",
            })
        }
        const user = await User.findById(decode._id);
        if(!user) {
            return res.status(401).json({
                message : "Nguoi dung ko ton tai",
            })
        }
        if(user.role !== "admin"){
            return res.status(403).json({
                message : "Ban khong co quyen truy cap vao",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}