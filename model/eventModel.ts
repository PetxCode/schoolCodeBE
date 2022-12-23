import mongoose from "mongoose";

interface iEvent {
  title: string;
  desc: string;
  month: string;
  year?: string;
  time?: string;
  fixedDate?: string;
  dateTime?: string;
  school?: {}[];
  date?: string;
}

interface iEventData extends iEvent, mongoose.Document {
  _doc: any;
  _id: any;
}
const eventModel = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    fixedDate: {
      type: String,
    },
    dateTime: {
      type: String,
    },
    date: {
      type: String,
    },
    month: {
      type: String,
    },
    time: {
      type: String,
    },
    year: {
      type: String,
    },
    done: {
      type: Boolean,
    },
    school: {
      type: mongoose.Types.ObjectId,
      ref: "schools",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iEventData>("events", eventModel);
