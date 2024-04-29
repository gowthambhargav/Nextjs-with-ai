import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(email:string,username:string,verifyCode:string):Promise<ApiResponse>{
try {
     await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'Mystry Verification code',
        react: VerificationEmail({username,otp:verifyCode}),
      });
    return {success:true, message:"verification email Sent successfully"}
} catch (error) {
    console.error("Error Sending verification email",error)
    return {success:false, message:"Failed to send verification email"}
}
} 

  








