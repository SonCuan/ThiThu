import Joi from "joi";

export const productSchema = Joi.object({
    name : Joi.string().trim().required().min(3),
    price : Joi.number().required().min(0),
    description: Joi.string()
})

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password : Joi.string().trim().required().min(6),
})