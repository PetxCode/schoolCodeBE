import mongoose from "mongoose";

interface iSchool {
  schoolName?: string;
  email?: string;
  password?: string;
  logo?: string;
  token?: string;
  schoolCode?: string;
  verified?: boolean;
  teachers?: {}[];
}

interface iSchoolData extends iSchool, mongoose.Document {
  _doc;
  _id: string;
}

const schoolModel = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      require: true,
      unique: true,
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
    logo: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    schoolCode: {
      type: String,
    },
    teachers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "teachers",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iSchoolData>("schools", schoolModel);
