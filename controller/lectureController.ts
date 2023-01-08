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
    const {
      lectureTopic,
      lectureObjective,
      lectureNote,
      lectureTime,
      subjectCode,
    } = req.body;

    const getTeacher = await teacherModel.findById(req.params.id);
    const getSubject = await subjectModel.findOne({
      subjectToken: subjectCode,
    });

    const dater = Date.now();
    if (getTeacher && getSubject) {
      const lectureData = await lectureModel.create({
        lectureNote,
        lectureTime,
        lectureCode: code,
        lectureObjective,
        lectureTopic,
        time: `${moment(dater).format("dddd")}, ${moment(dater).format(
          "MMMM Do YYYY, h:mm:ss"
        )}`,
        teacherName: getTeacher?.name,
        className: getSubject?.className,
        subjectName: getSubject?.subjectName,
        lecturePerformance: 0,
      });

      getSubject!.lecture!.push(new mongoose.Types.ObjectId(lectureData._id));
      getSubject?.save();

      getTeacher!.lectures!.push(new mongoose.Types.ObjectId(lectureData?._id));
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
      path: "lectures",
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
      path: "lectures",
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

export const viewSingleLecture = async (req: Request, res: Response) => {
  try {
    const lecture = await lectureModel.findById(req.params.id);

    return res.status(200).json({
      message: "viewing single lecture",
      data: lecture,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
