import mongoose from "mongoose";

interface iSchool {
  schoolName?: string;
  email?: string;
  password?: string;
  logo?: string;
  token?: string;
  schoolCode?: string;
  status?: string;
  verified?: boolean;
  teachers?: {}[];
  classes?: {}[];
  students?: {}[];
  academicSession?: {}[];
  notification?: {}[];
  event?: {}[];
}

interface iSchoolData extends iSchool, mongoose.Document {
  _doc: any;
  _id: string;
}

const schoolModel = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    status: {
      type: String,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    logo: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    schoolCode: {
      type: String,
    },
    teachers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "teachers",
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
    academicSession: [
      {
        type: mongoose.Types.ObjectId,
        ref: "academicSessions",
      },
    ],
    students: [
      {
        type: mongoose.Types.ObjectId,
        ref: "students",
      },
    ],
    classes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "classes",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iSchoolData>("schools", schoolModel);
