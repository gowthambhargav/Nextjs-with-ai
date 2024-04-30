import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Model/User.model";
import { User } from "next-auth";
import { response } from "@/lib/Response";

export async function POST(request: Request) {
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

  const userId = user._id;
  const { acceptMessages } = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return response({
        success: false,
        message: "faild to update user status to accept mesages",
        status: 401,
    });
}
return response({
        data: updatedUser,
      success: true,
      message: "Message acceptance status updated successfully",
      status: 200,
    });
  } catch (error) {
    console.log("faild to update user status to accept mesages",error);
    return response({
      success: false,
      message: "faild to update user status to accept mesages",
      status: 500,
    });
  }
}





export async function GET(request:Request) {
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
  
    const userId = user._id;
    try {
        const foundUser = await UserModel.findById(userId);
        if (!foundUser) {
            return response({
              success: false,
              message: "User not foud",
              status: 404,
            });
          }
          return response({
            success: true,
            status: 200,
            data:{isAcceptingMessage:foundUser.isAcceptingMessage}
          });
    } catch (error) {
        console.log(error,"Error while geting the user");
        return response({
            success: false,
            message: "Error in geting message acceptence status",
            status: 500,
          });
    }
    
} 