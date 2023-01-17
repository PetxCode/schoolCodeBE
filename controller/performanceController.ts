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
    let total = getTest!.mainTest!.length;
    let score = (right / total) * 100;

    let scoreGrade = (score: number): string | undefined => {
      if (score < 60) {
        return "F";
      } else if (score < 70) {
        return "D";
      } else if (score < 80) {
        return "C";
      } else if (score < 90) {
        return "B";
      } else if (score <= 100) {
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
            failed: total - right,

            gradeScore: getTest?.gradeScore,
            totalScore: gradeScore! * right,
            testName: getTest?.subjectTest,
            testTitle: getTest?.testTitle,
            teacherName: getTest?.teacherName,
            studentName: getStudent?.name,
            class: getStudent?.className,
            grade: scoreGrade(score),
            precentage: `${score.toFixed(2)}%`,
            maxLength: total,
            rateScore: total * getTest!.gradeScore!,
          });

          getStudent!.performance!.push(
            new mongoose.Types.ObjectId(performance._id)
          );
          getStudent?.save();

          getTest!.student!.push(new mongoose.Types.ObjectId(performance._id));
          getTest!.students!.push(performance!.studentName);

          getTest?.save();
          return res.status(201).json({
            message: "performance created",
            data: performance,
          });
        }
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

export const createGeneralPerformance = async (req: Request, res: Response) => {
  try {
    const getStudent = await studentModel.findById(req.params.id);
    // const getTest = await testModel.findOne({
    //   testCode,
    // });

    // let gradeScore = getTest?.gradeScore;
    // let total = getTest!.mainTest!.length;
    // let score = (right / total) * 100;

    // let scoreGrade = (score: number): string | undefined => {
    //   if (score < 60) {
    //     return "F";
    //   } else if (score < 70) {
    //     return "D";
    //   } else if (score < 80) {
    //     return "C";
    //   } else if (score < 90) {
    //     return "B";
    //   } else if (score <= 100) {
    //     return "A";
    //   }
    // };

    const groupData = (data: {}[], props: string) => {
      return data.reduce((el: any, newEL: any) => {
        (el[newEL[props]] = el[newEL[props]] || []).push(newEL);
        return el;
      }, {});
    };

    const getNewStudent = await studentModel.findById(req.params.id).populate({
      path: "performance",
      options: {
        sort: { createdAt: 1 },
      },
    });

    const buildData = groupData(getNewStudent!.performance!, "testName");
    const subjectName = Object.keys(buildData);
    const subjectData = Object.values(buildData);

    const overAllMark = subjectData
      .map((el: any) => {
        return el.map((el: any) => {
          return el.rateScore;
        });
      })
      .map((el: any) => {
        return el;
      })
      .map((el: any) => {
        return el.reduce((a: any, b: any) => {
          return a + b;
        });
      });

    const mainScore = subjectData
      .map((el: any) => {
        return el.map((el: any) => {
          return el.totalScore;
        });
      })
      .map((el: any) => {
        return el;
      })
      .map((el: any) => {
        return el.reduce((a: any, b: any) => {
          return a + b;
        });
      });

    const score = subjectData
      .map((el: any) => {
        return el.map((el: any) => {
          return el.totalScore;
        });
      })
      .map((el: any) => {
        return el;
      })
      .map((el: any) => {
        return el;
      });

    let scoreRemake = (score: number): string | undefined => {
      if (score < 60) {
        return "F";
      } else if (score < 70) {
        return "D";
      } else if (score < 80) {
        return "C";
      } else if (score < 90) {
        return "B";
      } else if (score <= 100) {
        return "A";
      }
    };

    let remark: string = "";
    let remarkData: {}[] = [];

    for (let i = 0; i < overAllMark.length; i++) {
      for (let j = 0; j < mainScore.length; j++) {
        if (i === j) {
          if (mainScore[j] < overAllMark[i] * 0.4) {
            remark =
              "A very Poor performance,  please do try to improve in your studies!";

            remarkData.push({ remark });

            break;
          } else if (mainScore[j] < overAllMark[i] * 0.6) {
            remark =
              "A Fair performance, still need to improve in your studies!";

            remarkData.push({ remark });
            break;
          } else if (mainScore[j] < overAllMark[i] * 0.8) {
            remark = "A Good performance, but can still improve!";
            remarkData.push({ remark });
            break;
          } else if (mainScore[j] <= overAllMark[i] * 1) {
            remark = "An Excellent performance, Keep it up...!";
            remarkData.push({ remark });

            break;
          } else {
            remark = "Error";
            remarkData.push({ remark });

            break;
          }
        }
      }
    }

    if (getStudent) {
      return res.status(200).json({
        message: "Get a Test Code to continue",
        data: {
          score,
          mainScore,
          subjectName,
          overAllMark,
          remarkData,
        },
      });
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
