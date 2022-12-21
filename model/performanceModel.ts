import mongoose from "mongoose";

interface iClass {
  totalScore?: number;
  right?: number;
  failed?: number;
  gradeScore?: number;
  student?: {};
  studentName?: string;
  class?: string;
  testName?: string;
}

interface iClassData extends iClass, mongoose.Document {
  _doc: any;
}

const performanceModel = new mongoose.Schema(
  {
    totalScore: {
      type: Number,
      require: true,
    },

    right: {
      type: Number,
      require: true,
    },

    failed: {
      type: Number,
      require: true,
    },

    gradeScore: {
      type: Number,
      require: true,
    },

    student: {
      type: mongoose.Types.ObjectId,
      ref: "students",
    },

    studentName: {
      type: String,
    },
    testName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iClassData>("performances", performanceModel);
