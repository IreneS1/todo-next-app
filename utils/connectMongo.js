import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;
const connectMongo = async () => mongoose.connect(MONGODB_URI);

export default connectMongo;