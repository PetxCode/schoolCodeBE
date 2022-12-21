import mongoose from "mongoose";

interface iClass {
  present?: string;
  absent?: string;
  studentName?: string;
  className?: string;
  classTeacher?: string;
  students?: {};
}

interface iClassData extends iClass, mongoose.Document {
  _doc: any;
}

const attendanceModel = new mongoose.Schema(
  {
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
