import classModel from "../model/classModel";
import teacherModel from "../model/teacherModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import lectureModel from "../model/lectureModel";
import crypto from "crypto";
import moment from "moment";
import subjectModel from "../model/subjectModel";

export const createLecture = async (req: Request, res: Response) => {
  try {
    const code = crypto.randomBytes(3).toString("hex");
    const { lectureTopic, lectureDetails, lectureNote, lectureTime } = req.body;

    const getTeacher = await teacherModel.findById(req.params.id);
    const getSubject = await subjectModel.findById(req.params.subjectID);

    const getClass = await classModel.findOne({
      className: getTeacher?.classes,
    });

    const dater = Date.now();
    if (getTeacher) {
      const lectureData = await lectureModel.create({
        lectureNote,
        lectureTime,
        lectureCode: code,
        lectureDetails,
        lectureTopic,
        time: `${moment(dater).format("dddd")}, ${moment(dater).format(
          "MMMM Do YYYY, h:mm:ss"
        )}`,
        teacherName: getTeacher?.name,
        className: getSubject?.className,
        subjectName: getSubject?.subjectName,
        // classes: getClass,
        lecturePerformance: 0,
      });

      getSubject!.lecture!.push(new mongoose.Types.ObjectId(lectureData._id));
      getSubject?.save();

      getTeacher!.lecture!.push(new mongoose.Types.ObjectId(lectureData?._id));
      getTeacher?.save();

      return res.status(201).json({
        message: "lecture created",
        data: lectureData,
      });
    } else {
      return res.status(404).json({ message: "School can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewLecture = async (req: Request, res: Response) => {
  try {
    const test = await subjectModel.findById(req.params.id).populate({
      path: "lecture",
      options: {
        sort: { createdAt: -1 },
      },
    });

    console.log(test);

    return res.status(200).json({
      message: "viewing lecture",
      data: test,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTopLecture = async (req: Request, res: Response) => {
  try {
    const test = await subjectModel.findById(req.params.id).populate({
      path: "lecture",
      options: {
        sort: { createdAt: -1 },
        limit: 1,
      },
    });

    return res.status(200).json({
      message: "viewing test",
      data: test,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTeacherLecture = async (req: Request, res: Response) => {
  try {
    const lecture = await teacherModel.findById(req.params.id).populate({
      path: "lecture",
      options: {
        sort: { createdAt: -1 },
        limit: 1,
      },
    });

    return res.status(200).json({
      message: "viewing lecture",
      data: lecture,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTeacherAllLecture = async (req: Request, res: Response) => {
  try {
    const lecture = await teacherModel.findById(req.params.id).populate({
      path: "lecture",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(200).json({
      message: "viewing lecture",
      data: lecture,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
