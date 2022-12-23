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
import notificationModel from "../model/notificationModel";

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { title, detail } = req.body;

    const getSchool = await schoolModel.findById(req.params.id);

    const getTeacher = await teacherModel.findOne({
      schoolName: getSchool?.schoolName,
    });
    const getStudent = await studentModel.findOne({
      schoolName: getSchool?.schoolName,
    });

    if (getSchool) {
      const code = crypto.randomBytes(2).toString("hex");
      const dater = Date.now();

      const notice = await notificationModel.create({
        title,
        detail,
        schoolName: getSchool!.schoolName,
        dateTime: `${moment(dater).format("dddd")}, ${moment(dater).format(
          "MMMM Do YYYY, h:mm:ss"
        )}`,

        date: `${moment(dater).format("dddd")}`,
      });

      getSchool!.notification!.push(new mongoose.Types.ObjectId(notice._id));
      getSchool?.save();

      getTeacher!.notification!.push(new mongoose.Types.ObjectId(notice._id));
      getTeacher?.save();

      getStudent!.notification!.push(new mongoose.Types.ObjectId(notice._id));
      getStudent?.save();

      return res.status(201).json({
        message: "Announcement created",
        data: notice,
      });
    } else {
      return res.status(404).json({ message: "school can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewSchoolNotification = async (req: Request, res: Response) => {
  try {
    const notification = await schoolModel.findById(req.params.id).populate({
      path: "notification",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `Viewing notifications...!`,
      data: notification,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTeacherNotification = async (req: Request, res: Response) => {
  try {
    const notification = await teacherModel.findById(req.params.id).populate({
      path: "notification",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `Viewing notifications...!`,
      data: notification,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewStudentNotification = async (req: Request, res: Response) => {
  try {
    const notification = await studentModel.findById(req.params.id).populate({
      path: "notification",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `Viewing notifications...!`,
      data: notification,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
