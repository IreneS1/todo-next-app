import mongoose from 'mongoose';

if (!process.env.MONGO_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const MONGODB_URI: string = process.env.MONGO_URI;
const connectMongo = async () => mongoose.connect(MONGODB_URI);

export default connectMongo;