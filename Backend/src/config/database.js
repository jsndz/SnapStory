import mongoose from 'mongoose';

export const connect = async () =>{
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/SnapStory';
    await mongoose.connect(mongoURI);
}