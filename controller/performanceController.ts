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
    const { totalScore, right, failed, testCode, grade, precentage } = req.body;

    const getStudent = await studentModel.findById(req.params.id);
    const getTest = await testModel.findOne({
      testCode,
    });

    let gradeScore = getTest?.gradeScore;
    let total = getTest!.testDetails!.length;
    let score = (right / total) * 100;

    let scoreGrade = (): string | undefined => {
      if (score < 60) {
        return "F";
      } else if (score < 70) {
        return "D";
      } else if (score < 80) {
        return "C";
      } else if (score < 90) {
        return "B";
      } else if (score < 100) {
        return "A";
      }
    };

    if (getStudent) {
      if (getTest) {
        if (getTest!.students?.includes(getStudent?.name)) {
          return res
            .status(404)
            .json({ message: "You've already took the test before!" });
        } else {
          const performance = await performanceModel.create({
            right,
            failed,
            gradeScore: getTest?.gradeScore,
            totalScore: gradeScore! * right,
            testName: getTest?.subjectTest,
            teacherName: getTest?.teacherName,
            studentName: getStudent?.name,
            class: getStudent?.className,
            grade: scoreGrade(),
            precentage: `${score.toFixed(2)}%`,
            maxLength: total,
          });
          getStudent!.performance!.push(
            new mongoose.Types.ObjectId(performance._id)
          );
          getStudent?.save();

          getTest!.student!.push(new mongoose.Types.ObjectId(performance._id));

          getTest?.save();
          getTest!.students!.push(performance!.studentName);

          return res.status(201).json({
            message: "performance created",
            data: performance,
          });
        }
        // }
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

export const viewPerformance = async (req: Request, res: Response) => {
  try {
    const student = await studentModel.findById(req.params.id).populate({
      path: "performance",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(200).json({
      message: `Viewing student's result...!`,
      data: student,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const recentPerformance = async (req: Request, res: Response) => {
  try {
    const student = await studentModel.findById(req.params.id).populate({
      path: "performance",
      options: {
        sort: { createdAt: -1 },
        limit: 1,
      },
    });

    return res.status(200).json({
      message: `Viewing student's recent result...!`,
      data: student,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
