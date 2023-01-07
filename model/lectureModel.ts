import mongoose from "mongoose";

interface iLecture {
  lectureTopic?: string;
  time?: string;
  lectureObjective?: string;
  lectureNote?: string;
  teacherName?: string;
  className?: string;
  subjectName?: string;
  lecturePerformance?: number;
  classes?: {};
  teacher?: {};
  lectureCode?: String;
  rated?: {}[];
}

interface iLectureData extends iLecture, mongoose.Document {
  _doc: any;
}

const lectureModel = new mongoose.Schema(
  {
    lecturePerformance: {
      type: Number,
      require: true,
    },

    subjectName: {
      type: String,
      require: true,
    },
    className: {
      type: String,
      require: true,
    },
    lectureTopic: {
      type: String,
      require: true,
    },
    lectureObjective: {
      type: String,
      require: true,
    },
    lectureNote: {
      type: String,
      require: true,
    },

    lectureCode: {
      type: String,
      require: true,
    },

    time: {
      type: String,
      require: true,
    },

    classes: {
      type: mongoose.Types.ObjectId,
      ref: "classes",
    },

    teacher: {
      type: mongoose.Types.ObjectId,
      ref: "tests",
    },

    rated: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ratingLectures",
      },
    ],

    students: [{ type: String }],

    teacherName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iLectureData>("lectures", lectureModel);
