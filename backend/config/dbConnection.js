import mongoose from "mongoose";

const connectDB = async (req, res, next) => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongodb connected");
    });

    await mongoose.connect(`${process.env.MONGO_URI}/hospital`);
  } catch (error) {
    next(error);
  }
};

export default connectDB;