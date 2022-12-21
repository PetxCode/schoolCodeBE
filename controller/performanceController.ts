import schoolModel from "../model/schoolModel";
import teacherModel from "../model/teacherModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import crypto from "crypto";
import classModel from "../model/classModel";
import studentModel from "../model/studentModel";
import testModel from "../model/testModel";
import performanceModel from "../model/performanceModel";

export const createPerformance = async (req: Request, res: Response) => {
  try {
    const { totalScore, right, failed, testCode } = req.body;

    const getStudent = await studentModel.findById(req.params.id);
    const getTest = await testModel.findOne({
      testCode,
    });

    let gradeScore = getTest?.gradeScore;

    if (getStudent) {
      if (getTest) {
        const performance = await performanceModel.create({
          right,
          failed,
          gradeScore: getTest?.gradeScore,
          totalScore: gradeScore! * right,
          testName: getTest?.subjectTest,
          studentName: getStudent?.name,
          class: getStudent?.className,
        });

        getStudent!.performance!.push(
          new mongoose.Types.ObjectId(performance._id)
        );
        getStudent?.save();

        return res.status(201).json({
          message: "performance created",
          data: performance,
        });
      } else {
        return res.status(404).json({ message: "Get a Test Code to continue" });
      }
    } else {
      return res.status(404).json({ message: "Student can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const assigClassTeacher = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const school = await schoolModel.findById(req.params.id);
    const classes = await classModel.findById(req.params.classID);
    const teacher = await teacherModel.findOne({ name });

    if (teacher?.schoolName === school?.schoolName) {
      await classModel.findByIdAndUpdate(
        req.params.classID,
        {
          classTeacher: teacher?.name,
        },
        { new: true }
      );
      await teacherModel.findByIdAndUpdate(
        teacher!._id,
        {
          classes: classes!.className,
        },
        { new: true }
      );

      return res.status(200).json({
        message: `Teacher has been assigned to this Class...!`,
      });
    } else {
      return res
        .status(404)
        .json({ message: `Please check if the Name is rightly spelt` });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewClassDetailFromSchool = async (
  req: Request,
  res: Response
) => {
  try {
    const school = await schoolModel.findById(req.params.id);

    const code = crypto.randomBytes(2).toString("hex");

    if (school) {
      const myClass = await schoolModel.findById(school._id).populate({
        path: "classes",
        options: {
          sort: { createdAt: -1 },
        },
      });

      return res.status(200).json({
        message: `Viewing class detail...!`,
        data: myClass,
      });
    } else {
      return res.status(404).json({ message: `Please fixed the school Name` });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewClassDetailInfo = async (req: Request, res: Response) => {
  try {
    const myClass = await classModel.findById(req.params.id);

    const code = crypto.randomBytes(2).toString("hex");
    return res.status(200).json({
      message: `Viewing class detail...!`,
      data: myClass,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewClasses = async (req: Request, res: Response) => {
  try {
    const myClass = await classModel.find();

    return res.status(200).json({
      message: `Viewing class detail...!`,
      data: myClass,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
