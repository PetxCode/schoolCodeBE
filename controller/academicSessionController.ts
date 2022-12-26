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
        sessionCode: code,
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
        message: "Academic session is now created",
        data: academicSessionData,
      });
    } else {
      return res.status(404).json({ message: "student can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const AcademicSessionForTeacher = async (
  req: Request,
  res: Response
) => {
  try {
    const view = await teacherModel.findById(req.params.id);

    const session = await schoolModel.findOne({ schoolName: view?.schoolName });

    if (view?.schoolName === session!.schoolName) {
      const school = await schoolModel.findById(session?._id).populate({
        path: "academicSession",
        options: { sort: { createdAt: -1 }, limit: 1 },
      });
      return res.status(200).json({
        message: `Viewing academic session detail...!`,
        data: school!.academicSession![0],
      });
    } else {
      return res.status(404).json({ message: "Check your session code again" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const findAcademicSession = async (req: Request, res: Response) => {
  try {
    const { sessionCode } = req.body;
    const view = await schoolModel.findById(req.params.id);

    const session = await academicSessionModel.findOne({ sessionCode });

    console.log(session);
    console.log(view);

    if (view?.schoolName === session!.schoolName) {
      const school = await schoolModel.findById(req.params.id).populate({
        path: "academicSession",
        options: { sort: { createdAt: -1 }, limit: 1 },
      });
      return res.status(200).json({
        message: `Viewing academic session detail...!`,
        data: school!.academicSession![0],
      });
    } else {
      return res.status(404).json({ message: "Check your session code again" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewAcademicSession = async (req: Request, res: Response) => {
  try {
    const view = await schoolModel.findById(req.params.id);
    console.log(view);
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
      data: school!.academicSession![0],
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
