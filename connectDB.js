import "dotenv/config.js"
import mongoose from 'mongoose'

mongoose.set("strictQuery", true);
export const connection = async()=>{
    return await mongoose.connect(process.env.DATABASE_URI)
} 