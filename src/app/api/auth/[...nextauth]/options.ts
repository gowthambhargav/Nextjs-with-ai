import {NextAuthOptions} from 'next-auth'
import  CredentialsProvider  from 'next-auth/providers/credentials'
import bcrypt from "bcryptjs"
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/Model/User.model'


export const authOptions:NextAuthOptions = {
providers:[
    CredentialsProvider({
        id:"crddentials",
        name:"Credentials",
        credentials: {
            email: { label: "Email", type: "text"},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials:any):Promise<any> {
             await dbConnect()
             try {
              const user =  await UserModel.findOne({
                    $or:[
                        {email:credentials.identifier},
                        {username:credentials.identifier},
                        
                    ]
                })
                if(!user){
                    throw new Error("No user found with this email")
                }
                if(!user.isVerified){
                    throw new Error("Please verify your accout befor login")
                }
             const isPasswordcorrect =   await bcrypt.compare(credentials.password,user.password)
             if(isPasswordcorrect){
                return user
             }else{
                throw new Error("Incorrect Password")
             }
             } catch (error:any) {
                throw new Error(error)
                
             }
          }
    })
],
callbacks:{
    async session({ session, token }) {
        if(token){
            session.user._id = token._id;
            session.user.isVerified = token.isVerified;
            session.user.isAcceptingMissage = token.isAcceptingMissage;
            
        }
        return session
      },
      async jwt({ token, user }) {
        if(user){
            token._id = user._id?.toString();
            token.isVerified = user.isVerified;
            token.isAcceptingMissage = user.isAcceptingMissage
            token.username = user.username
        }
        return token
      }
},
pages:{
    signIn: '/sign-in',

},
session:{
    strategy:"jwt"
},
secret:process.env.NEXT_AUTH_SECRET
}










