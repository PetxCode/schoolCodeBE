import mongoose from "mongoose";

interface iSession {
  receiptToken?: string;
  studentName?: string;
  date?: string;
  sessionCode?: string;
  dateTime?: string;
  studentClass?: string;
  academicTerm?: string;
  amountPaid?: number;
  toBalance?: number;
  academicSession?: string;
  student?: {};
}

interface iSessionData extends iSession, mongoose.Document {
  _doc: any;
}

const schoolFeeModel = new mongoose.Schema(
  {
    receiptToken: {
      type: String,
    },
    sessionCode: {
      type: String,
    },
    dateTime: {
      type: String,
    },
    date: {
      type: String,
    },
    studentName: {
      type: String,
    },
    studentClass: {
      type: String,
    },

    amountPaid: {
      type: Number,
    },

    toBalance: {
      type: Number,
    },

    academicTerm: {
      type: String,
    },

    student: {
      type: mongoose.Types.ObjectId,
      ref: "students",
    },

    classes: {
      type: mongoose.Types.ObjectId,
      ref: "classes",
    },

    academicSession: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iSessionData>("schoolFees", schoolFeeModel);
