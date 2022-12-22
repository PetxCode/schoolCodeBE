import mongoose from "mongoose";

interface iSession {
  sessionPaymentCode: string;
  schoolName: string;
  academicSession?: string;
  academicTerm?: string;
  dateTime?: string;
  schoolFees?: {}[];
  date?: string;
}

interface iSessionData extends iSession, mongoose.Document {
  _doc: any;
  _id: any;
}

const academicSessionModel = new mongoose.Schema(
  {
    sessionPaymentCode: {
      type: String,
    },
    schoolName: {
      type: String,
    },
    academicSession: {
      type: String,
    },
    academicTerm: {
      type: String,
    },
    date: {
      type: String,
    },
    dateTime: {
      type: String,
    },
    schoolFees: [
      {
        type: mongoose.Types.ObjectId,
        ref: "schoolFees",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iSessionData>(
  "academicSessions",
  academicSessionModel
);
