import mongoose from "mongoose";

interface iSession {
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
    academicSession: {
      type: String,
      require: true,
    },
    academicTerm: {
      type: String,
      require: true,
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
