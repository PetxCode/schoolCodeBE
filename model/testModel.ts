import mongoose from "mongoose";

interface iClass {
  subjectTest?: string;
  time?: string;
  testDetails?: [];
  teacher?: {};
  teacherName?: string;
  gradeScore?: number;
  classes?: {};
  testCode?: String;
}

interface iClassData extends iClass, mongoose.Document {
  _doc: any;
}

const testModel = new mongoose.Schema(
  {
    subjectTest: {
      type: String,
      require: true,
    },
    gradeScore: {
      type: Number,
      require: true,
    },

    testCode: {
      type: String,
      require: true,
    },

    time: {
      type: String,
      require: true,
    },

    testDetails: {
      type: Array,
    },

    classes: {
      type: mongoose.Types.ObjectId,
      ref: "classes",
    },

    teacher: {
      type: mongoose.Types.ObjectId,
      ref: "tests",
    },

    teacherName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iClassData>("tests", testModel);
