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
import eventModel from "../model/eventModel";
import academicSessionModel from "../model/academicSessionModel";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, desc, month, time, year, fixedDate, code } = req.body;

    const getSchool = await schoolModel.findById(req.params.id);

    const getSession = await academicSessionModel.findOne({
      sessionPaymentCode: code,
    });

    if (getSchool) {
      const code = crypto.randomBytes(2).toString("hex");
      const dater = Date.now();

      const event = await eventModel.create({
        title,
        desc,
        month,
        time,
        year,
        fixedDate,
        schoolName: getSchool!.schoolName,
        dateTime: `${moment(dater).format("dddd")}, ${moment(dater).format(
          "MMMM Do YYYY, h:mm:ss"
        )}`,
        date: `${moment(dater).format("dddd")}`,
      });

      getSession!.event!.push(new mongoose.Types.ObjectId(event._id));
      getSession?.save();

      return res.status(201).json({
        message: "event created",
        data: event,
      });
    } else {
      return res.status(404).json({ message: "school can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const getSchool = await schoolModel.findById(req.params.id);

    if (getSchool) {
      const code = crypto.randomBytes(2).toString("hex");
      const dater = Date.now();

      const event = await eventModel.findByIdAndUpdate(
        req.params.eventID,
        {
          done: true,
        },
        { new: true }
      );

      return res.status(201).json({
        message: "event updated",
        data: event,
      });
    } else {
      return res.status(404).json({ message: "Event can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewSchoolEvent = async (req: Request, res: Response) => {
  try {
    const event = await academicSessionModel.findById(req.params.id).populate({
      path: "event",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `Viewing events...!`,
      data: event,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTeacherEvent = async (req: Request, res: Response) => {
  try {
    const event = await teacherModel.findById(req.params.id).populate({
      path: "event",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `Viewing events...!`,
      data: event,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewStudentEvent = async (req: Request, res: Response) => {
  try {
    const event = await studentModel.findById(req.params.id).populate({
      path: "event",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `Viewing events...!`,
      data: event,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
