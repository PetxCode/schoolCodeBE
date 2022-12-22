import classModel from "../model/classModel";
import teacherModel from "../model/teacherModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import testModel from "../model/testModel";
import crypto from "crypto";

export const createTest = async (req: Request, res: Response) => {
  try {
    const code = crypto.randomBytes(3).toString("hex");
    const { subjectTest, time, testDetails, gradeScore } = req.body;

    const getClass = await classModel.findById(req.params.classID);

    const getTeacher = await teacherModel.findById(req.params.id);

    if (getTeacher?.classes === getClass?.className || getTeacher) {
      const test = await testModel.create({
        testCode: code,
        gradeScore,
        subjectTest,
        time,
        testDetails,
        teacherName: getTeacher!.name,
      });

      getClass!.test!.push(new mongoose.Types.ObjectId(test._id));
      getClass?.save();

      getTeacher!.test!.push(new mongoose.Types.ObjectId(test?._id));
      getTeacher?.save();

      return res.status(201).json({
        message: "tested created",
        data: test,
      });
    } else {
      return res.status(404).json({ message: "School can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTest = async (req: Request, res: Response) => {
  try {
    const test = await classModel.findById(req.params.id).populate({
      path: "test",
      options: {
        sort: { createdAt: -1 },
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

export const viewTopTest = async (req: Request, res: Response) => {
  try {
    const test = await classModel.findById(req.params.id).populate({
      path: "test",
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

export const viewTeacherTest = async (req: Request, res: Response) => {
  try {
    const test = await teacherModel.findById(req.params.id).populate({
      path: "test",
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

export const viewTeacherAllTest = async (req: Request, res: Response) => {
  try {
    const test = await teacherModel.findById(req.params.id).populate({
      path: "test",
      options: {
        sort: { createdAt: -1 },
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
