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
      require: true,
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
      emum: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const doctorModel =
  mongoose.models.doctor || new mongoose.model("doctor", doctorSchema);
export default doctorModel;
