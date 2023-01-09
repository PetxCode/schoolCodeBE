import schoolModel from "../model/schoolModel";
import teacherModel from "../model/teacherModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import studentModel from "../model/studentModel";
import reportModel from "../model/reportModel";

export const createReportForTeacher = async (req: Request, res: Response) => {
  try {
    const { message, status, senderName } = req.body;

    const getTeacher = await teacherModel.findById(req.params.id);
    const getSchool = await schoolModel.findOne({
      schoolName: getTeacher?.schoolName,
    });

    if (getSchool) {
      const note = await reportModel.create({
        message,
        who: "Student",
        status: "not seen",
        senderName: getTeacher!.name,
        teacher: new mongoose.Types.ObjectId(getTeacher!._id),
      });

      getSchool!.report!.push(new mongoose.Types.ObjectId(note._id));
      getSchool?.save();

      getTeacher!.report!.push(new mongoose.Types.ObjectId(note._id));
      getTeacher?.save();

      return res.status(201).json({
        message: "report created",
        data: note,
      });
    } else {
      return res.status(404).json({ message: "school can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const createReportForStudent = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    const getTeacher = await studentModel.findById(req.params.id);
    const getSchool = await schoolModel.findOne({
      schoolName: getTeacher?.schoolName,
    });

    if (getSchool) {
      const note = await reportModel.create({
        message,
        who: "Teacher",
        status: "not seen",
        senderName: getTeacher!.name,
        student: new mongoose.Types.ObjectId(getTeacher!._id),
      });

      getSchool!.report!.push(new mongoose.Types.ObjectId(note._id));
      getSchool?.save();

      getTeacher!.report!.push(new mongoose.Types.ObjectId(note._id));
      getTeacher?.save();

      return res.status(201).json({
        message: "report created",
        data: note,
      });
    } else {
      return res.status(404).json({ message: "school can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const updateReportForStudent = async (req: Request, res: Response) => {
  try {
    const getTeacher = await studentModel.findById(req.params.id);
    const getSchool = await schoolModel.findOne({
      schoolName: getTeacher?.schoolName,
    });

    if (getSchool) {
      const note = await reportModel.findByIdAndUpdate(
        req.params.id,
        {
          status: "not seen",
        },
        { new: true }
      );

      return res.status(201).json({
        message: "report updated",
        data: note,
      });
    } else {
      return res.status(404).json({ message: "school can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewSchoolReport = async (req: Request, res: Response) => {
  try {
    const notify = await schoolModel.findById(req.params.id).populate({
      path: "report",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(200).json({
      message: "Here are data for this session...!",
      data: notify,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTeacherReport = async (req: Request, res: Response) => {
  try {
    const notify = await teacherModel.findById(req.params.id).populate({
      path: "report",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(200).json({
      message: "Here are data for this session...!",
      data: notify,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewStudentReport = async (req: Request, res: Response) => {
  try {
    const notify = await studentModel.findById(req.params.id).populate({
      path: "report",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(200).json({
      message: "Here are data for this session...!",
      data: notify,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
