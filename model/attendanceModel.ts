import mongoose from "mongoose";

interface iClass {
  present?: boolean;
  absent?: boolean;
  studentName?: string;
  className?: string;
  classTeacher?: string;
  students?: {};
  classes?: {};
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
      type: Boolean,
      require: true,
    },

    absent: {
      type: Boolean,
      require: true,
    },

    dateTime: {
      type: String,
      require: true,
    },

    students: {
      type: mongoose.Types.ObjectId,
      ref: "students",
    },

    classes: {
      type: mongoose.Types.ObjectId,
      ref: "classes",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iClassData>("attendances", attendanceModel);
