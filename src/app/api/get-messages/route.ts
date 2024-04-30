import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Model/User.model";
import { User } from "next-auth";
import { response } from "@/lib/Response";
import mongoose from "mongoose";




export async function GET(request:Request){
    await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return response({
      success: false,
      message: "Not Authenticated",
      status: 401,
    });
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
        {
            $match:{id:userId}
        },
        {$unwind:'$messages'},
        {$sort:{'messages.createdAt':-1}},
        {$group:{_id:'$_id',mesages:{$push:'$messages'}}}
    ])
    if (!user || user.length ===0) {
        return response({
            success: false,
            message: "User Not found",
            status: 400,
          });
    }
    return response({
        success: true,
        message: "faild to Get messages mesages",
        status: 200,
        data:{messages:user[0].messages}
      });
  } catch (error) {
    console.log("faild to Get messages mesages");
    return response({
      success: false,
      message: "faild to Get messages mesages",
      status: 500,
    });
  }
}


















