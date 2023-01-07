import mongoose from "mongoose";

interface iTest {
  question: string;
  anwser: string;
  a: string;
  b: string;
  c: string;
  d: string;
  myAnswer: string;
}

interface iTestData extends iTest, mongoose.Document {
  _doc: any;
}

const mainTestModel = new mongoose.Schema(
  {
    question: {
      type: String,
      require: true,
    },
    answer: {
      type: String,
      require: true,
    },

    myAnswer: {
      type: String,
      require: true,
    },

    a: {
      type: String,
      require: true,
    },
    b: {
      type: String,
      require: true,
    },

    c: {
      type: String,
      require: true,
    },
    d: {
      type: String,
      require: true,
    },

    test: {
      type: mongoose.Types.ObjectId,
      ref: "tests",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iTestData>("mainTests", mainTestModel);
