import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    medicalHistory: [
      {
        condition: {
          type: String,
          required: true,
        },
        diagnosisDate: {
          type: Date,
        },
        notes: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const patientModel =
  mongoose.models.patient || new mongoose.model("patient", patientSchema);
export default patientModel;
