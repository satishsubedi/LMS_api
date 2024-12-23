
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    status:{
        type:String,
        default:"inactive",
    },
    fName:{
        type:String,
        required:true,
    },
    lName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:1,
    },
    phone:{
        type:String,
    },
    role:{
        type:String,
        default:"user",
       required:true,
    },
    password:{
        type:String,
        required:true,
    },
    refreshJWT:{
        type:String,
        
    },
},{
    timestamps:true
})
export default mongoose.model("user",userSchema)