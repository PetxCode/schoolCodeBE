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
  report?: {}[];
  payRolls?: {}[];
  sessions?: any[];
  address?: string;
  contact?: string;
  vision?: string;
  mission?: string;
}

interface iSchoolData extends iSchool, mongoose.Document {
  _doc: any;
  _id: string;
}

const schoolModel = new mongoose.Schema(
  {
    sessions: {
      type: Array,
      // require: true,
      // unique: true,
    },

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
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    vision: {
      type: String,
    },
    mission: {
      type: String,
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
    report: [
      {
        type: mongoose.Types.ObjectId,
        ref: "reports",
      },
    ],
    notification: [
      {
        type: mongoose.Types.ObjectId,
        ref: "notifications",
      },
    ],

    payRolls: [
      {
        type: mongoose.Types.ObjectId,
        ref: "payRolls",
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
  { timestamps: true },
);

export default mongoose.model<iSchoolData>("schools", schoolModel);
