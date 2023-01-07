import mongoose from "mongoose";

interface iTeacher {
  name?: string;
  schoolName?: string;
  email?: string;
  password?: string;
  image?: string;
  status?: string;
  token?: string;
  teacherCode?: string;
  verified?: boolean;
  classes?: string[];
  resumedDate?: string;
  test?: {}[];
  lecture?: {}[];
  attendance?: {}[];
  notification?: {}[];
  event?: {}[];
  subjectTaken?: string[];
  mySubjects?: {}[];
  myClass?: {}[];
  report?: {}[];
}

interface iTeacherData extends iTeacher, mongoose.Document {
  _doc: any;
}

const teacherModel = new mongoose.Schema(
  {
    subjectTaken: {
      type: Array,
    },

    resumedDate: {
      type: String,
      require: true,
    },
    name: {
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
    status: {
      type: String,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    image: {
      type: String,
    },
    classes: {
      type: Array,
    },
    verified: {
      type: Boolean,
    },
    teacherCode: {
      type: String,
    },
    test: [
      {
        type: mongoose.Types.ObjectId,
        ref: "tests",
      },
    ],
    mySubjects: [
      {
        type: mongoose.Types.ObjectId,
        ref: "subjects",
      },
    ],
    myClass: [
      {
        type: mongoose.Types.ObjectId,
        ref: "classes",
      },
    ],
    lecture: [
      {
        type: mongoose.Types.ObjectId,
        ref: "tests",
      },
    ],

    report: [
      {
        type: mongoose.Types.ObjectId,
        ref: "reports",
      },
    ],
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
    school: {
      type: mongoose.Types.ObjectId,
      ref: "schools",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iTeacherData>("teachers", teacherModel);
