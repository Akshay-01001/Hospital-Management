import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    userId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",  
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