import mongoose from "mongoose";

interface iPayRoll {
  payData?: string;
  payMonth?: string;
  payYear?: string;
  recieved?: boolean;

  salary?: number;
  name?: string;

  teacher?: {};
}

interface iPayRollData extends iPayRoll, mongoose.Document {
  _doc: any;
}

const payRollModel = new mongoose.Schema(
  {
    payData: {
      type: String,
    },
    payYear: {
      type: String,
    },
    payMonth: {
      type: String,
    },
    name: {
      type: String,
    },
    salary: {
      type: Number,
    },

    recieved: {
      type: Boolean,
      require: true,
    },

    teacher: {
      type: mongoose.Types.ObjectId,
      ref: "teachers",
    },

    school: {
      type: mongoose.Types.ObjectId,
      ref: "schools",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iPayRollData>("payRolls", payRollModel);
