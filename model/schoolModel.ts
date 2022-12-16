import mongoose from "mongoose";

interface iSchool {
  name?: string;
  email?: string;
  password?: string;
  logo?: string;
  token?: string;
  schoolCode?: string;
  verified?: boolean;
}

interface iSchoolData extends iSchool, mongoose.Document {}

const schoolModel = new mongoose.Schema(
  {
    name: {
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
    logo: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    schoolCode: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iSchoolData>("schools", schoolModel);
