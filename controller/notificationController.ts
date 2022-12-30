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
import academicSessionModel from "../model/academicSessionModel";

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { title, detail, code } = req.body;

    const getSchool = await schoolModel.findById(req.params.id);

    const getSession = await academicSessionModel.findOne({
      sessionCode: code,
    });

    if (getSchool) {
      const dater = Date.now();
      console.log(getSession!.sessionCode);

      if (code === getSession?.sessionCode) {
        const notice = await notificationModel.create({
          title,
          detail,
          schoolName: getSchool!.schoolName,
          dateTime: `${moment(dater).format("dddd")}, ${moment(dater).format(
            "MMMM Do YYYY, h:mm:ss"
          )}`,

          date: `${moment(dater).format("dddd")}`,
        });

        getSession!.notification!.push(new mongoose.Types.ObjectId(notice._id));
        getSession?.save();

        return res.status(201).json({
          message: "Announcement created",
          data: notice,
        });
      } else {
        return res.status(404).json({
          message: "notify which session are you with the session code",
        });
      }
    } else {
      return res.status(404).json({ message: "school can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewSchoolNotification = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    const getSession = await academicSessionModel.findOne({
      sessionCode: code,
    });
    const school = await schoolModel.findById(req.params.id);

    if (school) {
      if (getSession) {
        const notify = await academicSessionModel
          .findById({
            _id: getSession._id,
          })
          .populate({
            path: "notification",
            options: {
              sort: { createdAt: -1 },
            },
          });

        return res.status(200).json({
          message: "Here are data for this session...!",
          data: notify,
        });
      } else {
        return res.status(404).json({
          message: "Please enter a session you'd like to work with...!",
        });
      }
    } else {
      return res.status(404).json({
        message: "no school has been registered",
      });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewSchoolNotificationOne = async (
  req: Request,
  res: Response
) => {
  try {
    const { code } = req.body;

    const getSession = await academicSessionModel.findOne({
      sessionCode: code,
    });
    const school = await schoolModel.findById(req.params.id);

    if (school) {
      if (getSession) {
        const notify = await academicSessionModel
          .findById({
            _id: getSession._id,
          })
          .populate({
            path: "notification",
            options: {
              sort: { createdAt: -1 },
              limit: 1,
            },
          });

        return res.status(200).json({
          message: "Here are data for this session...!",
          data: notify,
        });
      } else {
        return res.status(404).json({
          message: "Please enter a session you'd like to work with...!",
        });
      }
    } else {
      return res.status(404).json({
        message: "no school has been registered",
      });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTeacherNotification = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    const getSession = await academicSessionModel.findOne({
      sessionCode: code,
    });
    const teacher = await teacherModel.findById(req.params.id);

    const school = await schoolModel.findOne({
      schoolName: teacher!.schoolName,
    });

    if (school) {
      if (getSession) {
        const notify = await academicSessionModel
          .findById({
            _id: getSession._id,
          })
          .populate({
            path: "notification",
            options: {
              createdAt: -1,
            },
          });

        return res.status(200).json({
          message: "Here are data for this session...!",
          data: notify,
        });
      } else {
        return res.status(404).json({
          message: "Please enter a session you'd like to work with...!",
        });
      }
    } else {
      return res.status(404).json({
        message: "no school has been registered",
      });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewStudentNotification = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    const getSession = await academicSessionModel.findOne({
      sessionCode: code,
    });
    const student = await studentModel.findById(req.params.id);

    const school = await schoolModel.findOne({
      schoolName: student!.schoolName,
    });

    if (school) {
      if (getSession) {
        const notify = await academicSessionModel
          .findById({
            _id: getSession._id,
          })
          .populate({
            path: "notification",
            options: {
              createdAt: -1,
            },
          });

        return res.status(200).json({
          message: "Here are data for this session...!",
          data: notify,
        });
      } else {
        return res.status(404).json({
          message: "Please enter a session you'd like to work with...!",
        });
      }
    } else {
      return res.status(404).json({
        message: "no school has been registered",
      });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
