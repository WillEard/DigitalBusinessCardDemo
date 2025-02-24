import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));
}   

export default connectDB;