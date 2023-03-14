import schoolModel from "../model/schoolModel";
import teacherModel from "../model/teacherModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import payRollModel from "../model/payRollModel";
import academicSessionModel from "../model/academicSessionModel";
import moment from "moment";

export const createPayTeacher = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    const getSchool = await schoolModel.findById(req.params.id);
    const getTeacher = await teacherModel.findById(req.params.teacherID);

    const getAcademic = await academicSessionModel.findOne({
      sessionCode: code,
    });

    const dateTime = Date.now();
    const monthDate = moment(dateTime).format("MMMM Do YYYY, h:mm:ss");

    if (getSchool) {
      const pay = await payRollModel.create({
        payMonth: monthDate.split(" ")[0],
        payYear: monthDate.split(",")[0].split(" ")[2],
        payData: moment(dateTime).format("LLLL"),
        recieved: false,
        name: getTeacher!.name,
        salary: getTeacher!.salary,
      });


      getSchool!.payRolls!.push(new mongoose.Types.ObjectId(pay._id));
      getSchool?.save();

      getAcademic!.payRolls!.push(new mongoose.Types.ObjectId(pay._id));
      getAcademic?.save();

      getTeacher!.payRolls!.push(new mongoose.Types.ObjectId(pay._id));
      getTeacher?.save();

      return res.status(201).json({
        message: `Payment has been made for ${moment(dateTime).format("LLLL")}`,
        data: pay,
      });
    } else {
      return res.status(404).json({ message: "school can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const updateTeacherPay = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    const getTeacher = await teacherModel.findById(req.params.id);
    const getPay = await payRollModel.findById(req.params.paymentID);
    console.log(getTeacher);
    console.log(getPay);

    if (getTeacher) {
      const pay = await payRollModel.findByIdAndUpdate(
        req.params.paymentID,
        {
          recieved: true,
        },
        { new: true }
      );

      return res.status(201).json({
        message: `Payment has been confirm`,
        data: pay,
      });
    } else {
      return res.status(404).json({ message: "school can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTeacherPayment = async (req: Request, res: Response) => {
  try {
    const getTeacher = await teacherModel.findById(req.params.id).populate({
      path: "payRolls",
      options: {
        sort: { createdAt: -1 },
      },
    });
    return res.status(201).json({
      message: `Payment has been confirm`,
      data: getTeacher,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewSchoolPayment = async (req: Request, res: Response) => {
  try {
    const getSchool = await schoolModel.findById(req.params.id).populate({
      path: "payRolls",
      options: {
        sort: { createdAt: -1 },
      },
    });
    return res.status(201).json({
      message: `Payment has been confirm`,
      data: getSchool,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
