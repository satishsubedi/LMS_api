import { responseClient } from "./responseClient.js";

export const errorHandler = (err,req,res,next)=>{
const statusCode = err.statusCode || 500;
const message =err.message;

responseClient({req,res,message,statusCode});
// res.status(statusCode).json({
//     status:"error",
//     message:err.message
// })
}