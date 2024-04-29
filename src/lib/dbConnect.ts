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
      const db =   await mongoose.connect(process.env.MONGO_URI || "")
    connection.isConnexted =  db.connections[0].readyState
      console.log("Db connected Successfully");
      
    } catch (error) {
        console.log("Database connection failed",error);
        
        process.exit(1)
    }
}

export default dbConnect