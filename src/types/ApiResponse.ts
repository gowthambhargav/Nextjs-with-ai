import { Message } from "@/Model/User.model";

export interface ApiResponse{
    success:boolean;
    message:string;
    isAccesptingMessages?:boolean;
    messages?: Array<Message>
}