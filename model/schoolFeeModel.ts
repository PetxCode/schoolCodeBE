import mongoose from "mongoose";

interface iSession {
  studentName?: string;
  date?: string;
  studentClass?: string;
  academicTerm?: string;
  amountPaid?: number;
  toBalance?: number;
  academicSession?: {};
  student?: {};
}

interface iSessionData extends iSession, mongoose.Document {
  _doc: any;
}

const schoolFeeModel = new mongoose.Schema(
  {
    date: {
      type: String,
      require: true,
    },
    studentName: {
      type: String,
      require: true,
    },
    studentClass: {
      type: String,
      require: true,
    },

    amountPaid: {
      type: Number,
    },

    toBalance: {
      type: Number,
    },

    academicTerm: {
      type: String,
      require: true,
    },

    student: {
      type: mongoose.Types.ObjectId,
      ref: "students",
    },

    academicSession: {
      type: mongoose.Types.ObjectId,
      ref: "academicSessions",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iSessionData>("schoolFees", schoolFeeModel);
