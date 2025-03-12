import mongoose from "mongoose";

const medicineOrderSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    medicines: [
      {
        medicineId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "medicine",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

const medicineOrderModel =
  mongoose.models.medicineOrder ||
  mongoose.model("medicineOrder", medicineOrderSchema);

export default medicineOrderModel