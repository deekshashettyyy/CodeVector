import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connectionObj = await mongoose.connect(process.env.MONGODB_URL);

        //check
        // console.log(
        //     `MongoDB connected! DB Host = ${connectionObj.connection.host}`
        // );
    }
    catch(error)
    {
        console.log("MongoDB connection failed , ERROR : " , error);
        process.exit(1);
    }
} 

export default connectDB;