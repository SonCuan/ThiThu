import Product from "../models/Product.js";
import { productSchema } from "../validations/index.js";

export const createProduct = async (req, res) => { 
    try {
        const {error} = productSchema.validate(req.body , {abortEarly:false});
        if(error) { 
            const err = error.details.map((item) => item.message)
            return res.status(400).json({
                message : err
            })
        }
        const product = await Product.create(req.body);
        if(!product) { 
            return res.status(400).json({
                message : "Khong tao duoc san pham"
            })
        }
        return res.status(200).json({
            message : " Tao san pham thanh cong",
            data : product
        })
    } catch (error) {
        console.log(error);
    }
}
export const getAll = async (req, res) => { 
    try {
        const product = await Product.find(req.body);
        if(!product) { 
            return res.status(400).json({
                message : "Khong tao duoc san pham"
            })
        }
        return res.status(200).json({
            message : " Lay san pham thanh cong",
            data : product
        })
    } catch (error) {
        console.log(error);
    }
}

export const getDetail = async (req, res) => { 
    try {
        const product = await Product.findById(req.params.id);
        if(!product) { 
            return res.status(400).json({
                message : "Khong tao duoc san pham"
            })
        }
        return res.status(200).json({
            message : " Lay san pham thanh cong",
            data : product
        })
    } catch (error) {
        console.log(error);
    }
}
export const getUpdate = async (req, res) => { 
    try {
        const {error} = productSchema.validate(req.body , {abortEarly:false});
        if(error) { 
            const err = error.details.map((item) => item.message)
            return res.status(400).json({
                message : err
            })
        }
        const product = await Product.findByIdAndUpdate(req.params.id , req.body, {new: true});
        if(!product) { 
            return res.status(400).json({
                message : "Khong cap nhat duoc san pham"
            })
        }
        return res.status(200).json({
            message : " Cap nhat san pham thanh cong",
            data : product
        })
    } catch (error) {
        console.log(error);
    }
}
export const remove = async (req, res) => { 
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) { 
            return res.status(400).json({
                message : "Khong xoa duoc san pham"
            })
        }
        return res.status(200).json({
            message : " Xoa san pham thanh cong",
            data : product
        })
    } catch (error) {
        console.log(error);
    }
}