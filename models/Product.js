
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {type : String , required:true , minLength : 3 }, 
    price : {type:Number , required:true} ,
    description : {type:String , required:true} ,
}, { 
    timestamps: true , 
    versionKey: false,
})
export default mongoose.model("Product", productSchema);