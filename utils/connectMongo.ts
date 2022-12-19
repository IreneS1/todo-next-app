import mongoose from "mongoose";

const connectMongo = async () => {
  let MONGODB_URI = process.env.MONGO_URI;
  if (!process.env.MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI invironment variable inside .env.local"
    );
  }
  mongoose.connect(MONGODB_URI!);
};

export default connectMongo;
