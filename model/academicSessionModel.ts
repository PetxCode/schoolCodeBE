import mongoose from "mongoose";

interface iSession {
  sessionCode: string;
  schoolName: string;
  academicSession?: string;
  academicTerm?: string;
  dateTime?: string;
  schoolFees?: {}[];
  notification?: {}[];
  event?: {}[];
  date?: string;
}

interface iSessionData extends iSession, mongoose.Document {
  _doc: any;
  _id: any;
}

const academicSessionModel = new mongoose.Schema(
  {
    sessionCode: {
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
    notification: [
      {
        type: mongoose.Types.ObjectId,
        ref: "notifications",
      },
    ],
    event: [
      {
        type: mongoose.Types.ObjectId,
        ref: "events",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iSessionData>(
  "academicSessions",
  academicSessionModel
);
