import mongoose from "mongoose";

type ConnextionObjext ={
    isConnexted?:number
}

const connection :ConnextionObjext ={}

async function dbConnect():Promise<void>{
    if(connection.isConnexted){
        console.log("Already connected to DB");
        return
    }
    try {
        
    } catch (error) {
        
    }
}