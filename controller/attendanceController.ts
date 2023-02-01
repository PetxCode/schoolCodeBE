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

export const createAttendancePresent = async (req: Request, res: Response) => {
  try {
    const getTeacher = await teacherModel.findById(req.params.id);
    const getStudent = await studentModel.findById(req.params.studentID);

    const getClass = await classModel.findOne({
      className: getStudent!.className,
    });

    if (getTeacher && getStudent) {
      const code = crypto.randomBytes(2).toString("hex");
      const dater = Date.now();

      const attendance = await attendanceModel.create({
        className: getStudent!.className,
        classToken: code,
        present: true,
        absent: false,
        studentName: getStudent!.name,
        classTeacher: getTeacher!.name,
        dateTime: `${moment(dater).format("dddd")}, ${moment(dater).format(
          "MMMM Do YYYY"
        )}`,

        date: `${moment(dater).format("dddd")}`,
      });

      getTeacher!.attendance!.push(new mongoose.Types.ObjectId(attendance._id));
      getTeacher?.save();

      getClass!.attendance!.push(new mongoose.Types.ObjectId(attendance._id));
      getClass?.save();

      getStudent!.attendance!.push(new mongoose.Types.ObjectId(attendance._id));
      getStudent?.save();

      return res.status(201).json({
        message: "student has been marked Present for today",
        data: attendance,
      });
    } else {
      return res.status(404).json({ message: "student can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const createAttendanceAbsent = async (req: Request, res: Response) => {
  try {
    const { className, present, absent, studentName, classTeacher } = req.body;

    const getTeacher = await teacherModel.findById(req.params.id);
    const getStudent = await studentModel.findById(req.params.studentID);

    const getClass = await classModel.findOne({
      className: getStudent!.className,
    });

    if (getTeacher && getStudent) {
      const code = crypto.randomBytes(2).toString("hex");
      const dater = Date.now();

      const attendance = await attendanceModel.create({
        className: getStudent!.className,
        classToken: code,
        present: false,
        absent: true,
        studentName: getStudent!.name,
        classTeacher: getTeacher!.name,
        dateTime: `${moment(dater).format("dddd")}, ${moment(dater).format(
          "MMMM Do YYYY"
        )}`,

        date: `${moment(dater).format("dddd")}`,
      });

      getTeacher!.attendance!.push(new mongoose.Types.ObjectId(attendance._id));
      getTeacher?.save();

      getStudent!.attendance!.push(new mongoose.Types.ObjectId(attendance._id));
      getStudent?.save();

      getClass!.attendance!.push(new mongoose.Types.ObjectId(attendance._id));
      getClass?.save();

      return res.status(201).json({
        message: "student has been marked Absent for today ",
        data: attendance,
      });
    } else {
      return res.status(404).json({ message: "Student can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewStudentAttendanceByTeacher = async (
  req: Request,
  res: Response
) => {
  try {
    const attendance = await classModel.findById(req.params.id).populate({
      path: "attendance",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `Viewing attendance attendance detail...!`,
      data: attendance,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewStudentAttendance = async (req: Request, res: Response) => {
  try {
    const student = await studentModel.findById(req.params.id).populate({
      path: "attendance",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `Viewing student attendance detail...!`,
      data: student,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
