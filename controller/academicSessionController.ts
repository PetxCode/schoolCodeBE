import schoolModel from "../model/schoolModel";
import teacherModel from "../model/teacherModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import crypto from "crypto";
import classModel from "../model/classModel";
import studentModel from "../model/studentModel";
import performanceModel from "../model/performanceModel";
import attendanceModel from "../model/attendanceModel";
import moment from "moment";
import academicSessionModel from "../model/academicSessionModel";

export const createAcademicSession = async (req: Request, res: Response) => {
  try {
    const getSchool = await schoolModel.findById(req.params.id);
    const { academicSession, academicTerm } = req.body;

    if (getSchool) {
      const dater = Date.now();
      const code = crypto.randomBytes(3).toString("hex");
      const academicSessionData = await academicSessionModel.create({
        schoolName: getSchool!.schoolName,
        sessionPaymentCode: code,
        academicSession,
        academicTerm,
        dateTime: `${moment(dater).format("dddd")}, ${moment(dater).format(
          "MMMM Do YYYY, h:mm:ss"
        )}`,

        date: `${moment(dater).format("dddd")}`,
      });

      getSchool!.academicSession!.push(
        new mongoose.Types.ObjectId(academicSessionData._id)
      );
      getSchool?.save();

      return res.status(201).json({
        message: "student has been marked Present for today",
        data: academicSessionData,
      });
    } else {
      return res.status(404).json({ message: "student can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewAcademicSession = async (req: Request, res: Response) => {
  try {
    const school = await schoolModel.findById(req.params.id).populate({
      path: "academicSession",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `Viewing academic session detail...!`,
      data: school,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewPresentAcademicSession = async (
  req: Request,
  res: Response
) => {
  try {
    const school = await schoolModel.findById(req.params.id).populate({
      path: "academicSession",
      options: { sort: { createdAt: -1 }, limit: 1 },
    });

    return res.status(200).json({
      message: `Viewing present academic session detail...!`,
      data: school,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
