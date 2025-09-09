import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
export const JWT_EXP = process.env.JWT_EXP ?? "1d";
export const JWT_SECRET = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET || !JWT_EXP) {
  console.error(" invalid or missing JWT config ");
  process.exit(1);
}

export default connectDB;
