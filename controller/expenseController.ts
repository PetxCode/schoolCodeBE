import schoolModel from "../model/schoolModel";
import teacherModel from "../model/teacherModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import payRollModel from "../model/payRollModel";
import academicSessionModel from "../model/academicSessionModel";
import moment from "moment";
import expenseModel from "../model/expenseModel";

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { code, cost, item, description } = req.body;

    const getSchool = await schoolModel.findById(req.params.id);
    const getSession = await academicSessionModel.findOne({
      sessionCode: code,
    });

    const dateTime = Date.now();

    if (getSchool) {
      const expense = await expenseModel.create({
        date: moment(dateTime).format("LLLL"),
        cost,
        item,
        description,
      });

      getSession!.expense!.push(new mongoose.Types.ObjectId(expense._id));
      getSession?.save();

      return res.status(201).json({
        message: `expense has been recorded for ${moment(dateTime).format(
          "LLLL"
        )}`,
        data: expense,
      });
    } else {
      return res.status(404).json({ message: "school can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const getExpense = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    const getSchool = await schoolModel.findById(req.params.id);
    const getSession = await academicSessionModel.findOne({
      sessionCode: code,
    });

    if (getSchool) {
      const expense = await academicSessionModel
        .findById(getSession?._id)
        .populate({
          path: "expense",
          options: {
            sort: {
              createdAt: -1,
            },
          },
        });

      return res.status(201).json({
        message: `view expense `,
        data: expense,
      });
    } else {
      return res.status(404).json({ message: "school can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
