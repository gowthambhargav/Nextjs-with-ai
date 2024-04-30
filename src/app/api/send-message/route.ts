import UserModel from "@/Model/User.model";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/Model/User.model";
import { response } from "@/lib/Response";


export async function POST(request:Request){
    await dbConnect();
  const {username , content} = await request.json();

  try {
   const user = await UserModel.findOne({username});
   if (!user) {
    return response({success:false,message:"User not found",status:404})
   }
   if(!user.isAcceptingMessage){
    return response({success:false,message:"User is not accepting the messages",status:401})
   }
   const newMessages = {content,createdAt:new Date()}
   user.messages.push(newMessages as Message)
   await user.save()
   return response({
    success: true,
    message: "Message sent successfully",
    status: 200,
  });
  } catch (error) {
    console.log("Error whine sending messages");
    return response({
        success: false,
        message: "faild to Send mesages",
        status: 500,
      });
    
  }
}
















