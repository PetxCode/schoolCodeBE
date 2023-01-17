import mongoose from "mongoose";

interface iExpense {
  item?: string;
  date?: string;
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
  },
  { timestamps: true }
);

export default mongoose.model<iExpenseData>("expenses", expenseModel);
