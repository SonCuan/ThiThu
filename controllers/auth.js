import User from "../models/User.js";
import jwt from "jsonwebtoken";
import  bcrypt  from 'bcryptjs';
import { userSchema } from "../validations/index.js";

export const login = async (req, res) => { 
    try {
        const {error} = userSchema.validate(req.body , {abortEarly:false});
        if(error) { 
            const err = error.details.map((item) => item.message)
            return res.status(400).json({
                message : err
            })
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) { 
            return res.status(400).json({
                message : "Email nay chua duoc dang ky "
            })
        }
        const isMatch =  bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message : "Mat khau khong dung"
            })
        }     
        const token = jwt.sign({_id : user._id } , "quanns",  {expiresIn : "1d"});
        if(!token) { 
            return res.status(400).json({
                message: "Khong tao duoc token"
            })
        }
        user.password = undefined;
        return res.status(200).json({
            message : "Dang nhap thanh cong",
            data : user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}


export const signup = async (req,res) => {
    try {
        const {error} = userSchema.validate(req.body , {abortEarly:false});
        if(error) { 
            const err = error.details.map((item) => item.message)
            return res.status(400).json({
                message : err
            })
        }
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(user) { 
            return res.status(400).json({
                message : "Tai khoan da duoc dang ky"
            })
        } 
        const hasdPassword = await bcrypt.hash(password, 10);
        const newUser = new User ( { 
            email,
            password : hasdPassword

        })
        await User.create(newUser);
        newUser.password = undefined;
        return res.status(500).json({
            message : "Dang ky thanh cong",
            data : newUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
 