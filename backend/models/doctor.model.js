import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    availableDays: {
      type: [String],
      enum: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
      required: true,
    },
    availableSlots: [
      {
        day: String, 
        slots: [String],
      },
    ],
  },
  { timestamps: true }
);

const doctorModel =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
export default doctorModel;