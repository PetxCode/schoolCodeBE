import mongoose from "mongoose";

interface iTeacher {
  name?: string;
  schoolName?: string;
  email?: string;
  password?: string;
  image?: string;
  token?: string;
  teacherCode?: string;
  verified?: boolean;
}

interface iTeacherData extends iTeacher, mongoose.Document {
  _doc;
}

const teacherModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    schoolName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    image: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    teacherCode: {
      type: String,
    },
    school: {
      type: mongoose.Types.ObjectId,
      ref: "schools",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iTeacherData>("teachers", teacherModel);
