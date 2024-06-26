import UserModel from "@/Model/User.model";
import dbConnect from "@/lib/dbConnect";
import { verifySchema } from "@/schemas/verifySchema";
import {z} from "zod"


export async function POST(request:Request){
    await dbConnect();
    try {
      const {username,code} =  await request.json();
      const decodedUsername = decodeURIComponent(username);
    const user =  await UserModel.findOne({username:decodedUsername})
      if (!user) {
        return Response.json({
            success:false,
            message:"User not foud"
        },{status:500})
      }
      const isCodeValid = user.verifyCode ===code
      const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()
if(isCodeValid && isCodeNotExpired){
user.isVerified = true;
await user.save()
return Response.json({
    success:true,
    message:"Account verified sucessfully"
},{status:200})
} else if(!isCodeNotExpired){
    return Response.json({
        success:false,
        message:"Verification code has expored pleade signup again to get a new code"
    },{status:400})
}else{
    return Response.json({
        success:false,
        message:"Incorrect verification code"
    },{status:400})
}

    } catch (error) {
        return Response.json({
            success:false,
            message:"Error verifying code"
        },{status:500})
    }
}












