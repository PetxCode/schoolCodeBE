import mongoose from "mongoose";

interface iClass {
  schoolName?: string;
  className?: string;
  classTeacher?: string;
  classToken?: string;
  teacherCode?: string;
  termFee?: number;
  students?: {}[];
  test?: {}[];
  schoolFee?: {}[];
  subject?: {}[];
}

interface iClassData extends iClass, mongoose.Document {
  _doc: any;
}

const classModel = new mongoose.Schema(
  {
    termFee: {
      type: Number,
      require: true,
    },
    className: {
      type: String,
      require: true,
    },
    classTeacher: {
      type: String,
      require: true,
    },
    classToken: {
      type: String,
    },
    teacherCode: {
      type: String,
    },
    schoolName: {
      type: String,
    },

    schoolFee: [
      {
        type: mongoose.Types.ObjectId,
        ref: "schoolFees",
      },
    ],

    students: [
      {
        type: mongoose.Types.ObjectId,
        ref: "students",
      },
    ],
    subject: [
      {
        type: mongoose.Types.ObjectId,
        ref: "subjects",
      },
    ],
    test: [
      {
        type: mongoose.Types.ObjectId,
        ref: "tests",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iClassData>("classes", classModel);
