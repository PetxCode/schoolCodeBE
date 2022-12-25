import classModel from "../model/classModel";
import teacherModel from "../model/teacherModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import lectureModel from "../model/lectureModel";
import crypto from "crypto";
import moment from "moment";
import subjectModel from "../model/subjectModel";
import studentModel from "../model/studentModel";
import ratingTeachingModel from "../model/ratingTeachingModel";

export const createLecture = async (req: Request, res: Response) => {
  try {
    const code = crypto.randomBytes(3).toString("hex");
    const { ratingLecture } = req.body;

    const getStudent = await studentModel.findById(req.params.id);
    const getLecture = await lectureModel.findById(req.params.lectureID);

    const getTeacher = await lectureModel.findOne({
      name: getLecture!.teacherName,
    });

    const getClass = await classModel.findOne({
      className: getLecture?.className,
    });

    // console.log(getTeacher);
    // console.log(getLecture);
    // console.log(getStudent);

    const dater = Date.now();
    if (getStudent?.className === getClass?.className || getLecture) {
      console.log("start");

      const ratingData = await ratingTeachingModel.create({
        ratingLecture,
        time: `${moment(dater).format("dddd")}, ${moment(dater).format(
          "MMMM Do YYYY, h:mm:ss"
        )}`,
        className: getLecture?.className,
        studentName: getStudent?.name,
        lectureName: getLecture!.subjectTopic,
        subjectName: getLecture!.subjectName,
        subjectTeacher: getLecture?.teacherName,
      });

      //   var resData = getLecture!.ratingLecture
      //   .map((bill) => bill.pendingAmount)
      //   .reduce((acc, bill) => bill + acc);

      await lectureModel.findByIdAndUpdate(
        req.params.lectureID,
        {},
        { new: true }
      );

      //   getLecture!.rating!.push(new mongoose.Types.ObjectId(ratingData._id));
      //   getLecture?.save();

      //   getTeacher!.rating!.push(new mongoose.Types.ObjectId(ratingData?._id));
      //   getTeacher?.save();

      return res.status(201).json({
        message: "lecture rated",
        data: ratingData,
      });
    } else {
      return res.status(404).json({ message: "School can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewLectureRating = async (req: Request, res: Response) => {
  try {
    const rating = await lectureModel.findById(req.params.id).populate({
      path: "rating",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(200).json({
      message: "viewing lecture",
      data: rating,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

// export const viewTopLecture = async (req: Request, res: Response) => {
//   try {
//     const test = await subjectModel.findById(req.params.id).populate({
//       path: "lecture",
//       options: {
//         sort: { createdAt: -1 },
//         limit: 1,
//       },
//     });

//     return res.status(200).json({
//       message: "viewing test",
//       data: test,
//     });
//   } catch (error) {
//     return res.status(404).json({ message: `Error: ${error}` });
//   }
// };

// export const viewTeacherLecture = async (req: Request, res: Response) => {
//   try {
//     const lecture = await teacherModel.findById(req.params.id).populate({
//       path: "lecture",
//       options: {
//         sort: { createdAt: -1 },
//         limit: 1,
//       },
//     });

//     return res.status(200).json({
//       message: "viewing lecture",
//       data: lecture,
//     });
//   } catch (error) {
//     return res.status(404).json({ message: `Error: ${error}` });
//   }
// };

// export const viewTeacherAllLecture = async (req: Request, res: Response) => {
//   try {
//     const lecture = await teacherModel.findById(req.params.id).populate({
//       path: "lecture",
//       options: {
//         sort: { createdAt: -1 },
//       },
//     });

//     return res.status(200).json({
//       message: "viewing lecture",
//       data: lecture,
//     });
//   } catch (error) {
//     return res.status(404).json({ message: `Error: ${error}` });
//   }
// };
