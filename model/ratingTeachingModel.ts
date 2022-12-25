import mongoose from "mongoose";

interface iRateLearning {
  className?: string;
  studentName?: string;
  subjectName?: string;
  lectureName?: string;
  subjectTeacher?: string;
  time?: string;

  ratingLecture: number;

  classes?: {};
  students?: {}[];
  test?: {}[];
  lecture?: {};
}

interface iRateLearningData extends iRateLearning, mongoose.Document {
  _doc: any;
}

const rateTeachingModel = new mongoose.Schema(
  {
    time: {
      type: String,
      require: true,
    },
    ratingLecture: {
      type: Number,
      require: true,
    },

    lectureName: {
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

    lecture: {
      type: mongoose.Types.ObjectId,
      ref: "lectures",
    },
  },

  { timestamps: true }
);

export default mongoose.model<iRateLearningData>(
  "ratingLectures",
  rateTeachingModel
);
