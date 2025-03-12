import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["doctor", "patient", "admin"],
      required: true,
    },
    image : {
      type : String
    }
  },
  { timestamps: true }
);

const userModel =
  mongoose.models.user || new mongoose.model("user", userSchema);
export default userModel;
