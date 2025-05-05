import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rahmonbalogun449:4HDbqxuXwoZNLkPH@cluster0.piooqva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDB;
