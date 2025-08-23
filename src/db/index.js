import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try{
        const connectionInstance = 
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`\nMongoDB Connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error){
        console.log("MongoDB Connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB;

// remember whenever working with db
// 1. potential errors may arise
// 2. db is on another continent