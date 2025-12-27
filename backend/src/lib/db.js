import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async (MONGO_URI) => {
  try {
    const {MONGO_URI} = process.env;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    } 
    
    const conn = await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB: ", conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); //1 indicates failure and 0 indicates success
  }
};