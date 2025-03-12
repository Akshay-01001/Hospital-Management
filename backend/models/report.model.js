import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointment",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reportUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const reportModel =
  mongoose.models.report || mongoose.model("report", reportSchema);
export default reportModel;
