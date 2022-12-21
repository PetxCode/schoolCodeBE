import mongoose from "mongoose";

interface iClass {
  schoolName?: string;
  className?: string;
  classTeacher?: string;
  classToken?: string;
  teacherCode?: string;
  students?: {}[];
  test?: {}[];
}

interface iClassData extends iClass, mongoose.Document {
  _doc: any;
}

const classModel = new mongoose.Schema(
  {
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

    students: [
      {
        type: mongoose.Types.ObjectId,
        ref: "students",
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
