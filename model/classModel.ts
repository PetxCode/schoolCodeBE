import mongoose from "mongoose";

interface iClass {
  schoolName?: string;
  className?: string;
  classTeacher?: string;
  classToken?: string;
  teacherCode?: string;
  school?: {};
  students?: {}[];
}

interface iClassData extends iClass, mongoose.Document {
  _doc;
}

const classModel = new mongoose.Schema(
  {
    className: {
      type: String,
      require: true,
      unique: true,
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
    // schoolName: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "schools",
    // },
    students: [
      {
        type: mongoose.Types.ObjectId,
        ref: "students",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iClassData>("classes", classModel);
