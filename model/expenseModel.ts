import mongoose from "mongoose";

interface iExpense {
  item?: string;
  date?: string;
  paidMonth?: string;
  paidYear?: string;
  description?: string;

  cost?: number;
}

interface iExpenseData extends iExpense, mongoose.Document {
  _doc: any;
}

const expenseModel = new mongoose.Schema(
  {
    item: {
      type: String,
    },
    date: {
      type: String,
    },
    paidMonth: {
      type: String,
    },
    paidYear: {
      type: String,
    },
    description: {
      type: String,
    },
    cost: {
      type: Number,
    },
    school: {
      type: mongoose.Types.ObjectId,
      ref: "schools",
    },
    acedemicSession: {
      type: mongoose.Types.ObjectId,
      ref: "acedemicSession",
    },
  },
  { timestamps: true },
);

export default mongoose.model<iExpenseData>("expenses", expenseModel);
