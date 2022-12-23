import mongoose from "mongoose";

interface iNotice {
  title: string;
  detail: string;
  schoolName: string;
  academicSession?: string;
  academicTerm?: string;
  dateTime?: string;
  school?: {}[];
  date?: string;
}

interface iNoticeData extends iNotice, mongoose.Document {
  _doc: any;
  _id: any;
}

const notificationModel = new mongoose.Schema(
  {
    detail: {
      type: String,
    },
    title: {
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
    school: {
      type: mongoose.Types.ObjectId,
      ref: "schools",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iNoticeData>("notifications", notificationModel);
