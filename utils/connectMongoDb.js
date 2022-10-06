import mongoose from "mongoose";

const connectMongoDb = async () =>
	await mongoose.connect(process.env.MONGODB_URI);

export default connectMongoDb;
