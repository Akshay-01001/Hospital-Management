import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: { type: String },
  },
  { timestamps: true }
);

const medicineModel =
  mongoose.models.medicine || mongoose.model("medicine", medicineSchema);

export default medicineModel
