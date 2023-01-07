import mongoose from "mongoose";

interface iClass {
  subjectTest?: string;
  time?: string;
  testTitle?: string;
  testDetails?: [];
  teacher?: {};
  teacherName?: string;
  testState?: boolean;
  instruction?: string;
  gradeScore?: number;
  testName?: string;
  classes?: {};
  testCode?: String;
  student?: {}[];
  mainTest?: {}[];
  students?: any[];
}

interface iClassData extends iClass, mongoose.Document {
  _doc: any;
}

const testModel = new mongoose.Schema(
  {
    testTitle: {
      type: String,
      require: true,
    },
    subjectTest: {
      type: String,
      require: true,
    },
    testName: {
      type: Number,
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
    instruction: {
      type: String,
      require: true,
    },

    testState: {
      type: Boolean,
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

    student: [
      {
        type: mongoose.Types.ObjectId,
        ref: "students",
      },
    ],
    mainTest: [
      {
        type: mongoose.Types.ObjectId,
        ref: "mainTests",
      },
    ],

    students: [{ type: String }],

    teacherName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iClassData>("tests", testModel);
