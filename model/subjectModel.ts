import mongoose from "mongoose";

interface iSubject {
  className?: string;
  subjectName?: string;
  subjectTeacher?: string;
  subjectToken?: string;

  classes?: {};
  students?: {}[];
  test?: {}[];
  lecture?: {}[];
}

interface iSubjectData extends iSubject, mongoose.Document {
  _doc: any;
}

const subjectModel = new mongoose.Schema(
  {
    className: {
      type: String,
      require: true,
    },
    subjectToken: {
      type: String,
      require: true,
    },
    subjectName: {
      type: String,
      require: true,
    },

    subjectTeacher: {
      type: String,
      require: true,
    },

    subjectCode: {
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

    lecture: [
      {
        type: mongoose.Types.ObjectId,
        ref: "lectures",
      },
    ],

    classes: {
      type: mongoose.Types.ObjectId,
      ref: "classes",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iSubjectData>("subjects", subjectModel);
