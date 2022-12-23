import mongoose from "mongoose";

interface iStudent {
  name?: string;
  schoolName?: string;
  email?: string;
  password?: string;
  status?: string;
  image?: string;
  token?: string;
  teacherName?: string;
  verified?: boolean;
  className: string;
  performance?: {}[];
  attendance?: {}[];
  schoolFee?: {}[];
  notification?: {}[];
  event?: {}[];
}

interface iStudentData extends iStudent, mongoose.Document {
  _doc: any;
}

const studentModel = new mongoose.Schema(
  {
    className: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },

    schoolName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
    },

    image: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    teacherName: {
      type: String,
    },

    attendance: [
      {
        type: mongoose.Types.ObjectId,
        ref: "attendances",
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

    schoolFee: [
      {
        type: mongoose.Types.ObjectId,
        ref: "schoolFees",
      },
    ],

    classes: {
      type: mongoose.Types.ObjectId,
      ref: "classes",
    },

    school: {
      type: mongoose.Types.ObjectId,
      ref: "schools",
    },

    performance: [
      {
        type: mongoose.Types.ObjectId,
        ref: "performances",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iStudentData>("students", studentModel);
