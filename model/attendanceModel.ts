import mongoose from "mongoose";

interface iClass {
  present?: string;
  absent?: string;
  studentName?: string;
  className?: string;
  classTeacher?: string;
  students?: {};
  date?: string;
  dateTime?: string;
}

interface iClassData extends iClass, mongoose.Document {
  _doc: any;
}

const attendanceModel = new mongoose.Schema(
  {
    date: {
      type: String,
      require: true,
    },
    studentName: {
      type: String,
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

    present: {
      type: String,
      require: true,
    },

    absent: {
      type: String,
      require: true,
    },

    students: {
      type: mongoose.Types.ObjectId,
      ref: "students",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iClassData>("attendances", attendanceModel);
