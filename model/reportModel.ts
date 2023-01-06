import mongoose from "mongoose";

interface iReport {
  message?: string;
  senderName?: string;
  status?: string;
  student?: {}[];
  teacher?: {}[];
}

interface iReportData extends iReport, mongoose.Document {
  _doc: any;
}

const reportModel = new mongoose.Schema(
  {
    message: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    teacher: {
      type: mongoose.Types.ObjectId,
      ref: "tests",
    },

    student: [
      {
        type: mongoose.Types.ObjectId,
        ref: "students",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iReportData>("reports", reportModel);
