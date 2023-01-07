import classModel from "../model/classModel";
import teacherModel from "../model/teacherModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import testModel from "../model/testModel";
import crypto from "crypto";
import subjectModel from "../model/subjectModel";
import mainTestModel from "../model/mainTest";

export const createTestOption = async (req: Request, res: Response) => {
  try {
    const { question, a, b, c, d, answer, myAnswer } = req.body;

    const getTest = await testModel.findById(req.params.id);

    if (getTest) {
      const test = await mainTestModel.create({
        question,
        a,
        b,
        c,
        d,
        answer,
        myAnswer,
      });

      getTest!.mainTest!.push(new mongoose.Types.ObjectId(test._id));
      getTest?.save();

      return res.status(201).json({
        message: "test option created",
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
    const test = await subjectModel.findById(req.params.id).populate({
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

export const viewClassTest = async (req: Request, res: Response) => {
  try {
    const test = await classModel.findById(req.params.id).populate({
      path: "test",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(200).json({
      message: "viewing class test",
      data: test,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTopTest = async (req: Request, res: Response) => {
  try {
    const test = await subjectModel.findById(req.params.id).populate({
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

export const viewSingleTest = async (req: Request, res: Response) => {
  try {
    const test = await testModel.findById(req.params.id);

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
