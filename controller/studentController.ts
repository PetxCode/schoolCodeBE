import schoolModel from "../model/schoolModel";
import classModel from "../model/classModel";
import studentModel from "../model/studentModel";
import teacherModel from "../model/teacherModel";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import crypto from "crypto";
import {
  resetMyPasswordTeacherMail,
  verifiedTeacherMail,
} from "../utils/email";
import cloudinary from "../utils/cloudinary";
import streamifier from "streamifier";

import { config } from "dotenv";
import moment from "moment";
config();
const proc: any = config().parsed;

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, schoolName, className } = req.body;
    const getSchool = await schoolModel.findOne({ schoolName });
    const classes = await classModel.findOne({ className });

    if (getSchool?.schoolName === classes?.schoolName) {
      const pass = `${name.split(" ")[0] + name.split(" ")[1]}`;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pass, salt);

      const token = jwt.sign({ hash }, "ThisisStart");
      const date = Date.now();
      const student = await studentModel.create({
        email: `${name.split(" ")[0] + name.split(" ")[1]}@${
          schoolName.split(" ")[0]
        }.com`.toLowerCase(),
        name,
        registerDate: `${moment(date).format("dddd")}, ${moment(date).format(
          "MMMM Do YYYY, h:mm:ss"
        )}`,
        schoolName: getSchool!.schoolName,
        password: hash,
        token: "",
        verified: true,
        status: "Student",
        className,
      });

      getSchool!.students!.push(new mongoose.Types.ObjectId(student._id));
      getSchool?.save();

      classes!.students!.push(new mongoose.Types.ObjectId(student._id));
      classes?.save();

      return res.status(201).json({
        message: "student created",
        data: student,
      });
    } else {
      return res.status(404).json({ message: "School can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const assigningStudentToClass = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const getClass = await classModel.findById(req.params.classID);
    const getTeacher = await teacherModel.findById(req.params.id);

    if (getTeacher) {
      const getStudent = await studentModel.findOne({ name });

      getClass!.students!.push(new mongoose.Types.ObjectId(getStudent!._id));
      getClass?.save();

      await studentModel.findByIdAndUpdate(
        getStudent?._id,
        {
          className: getClass!.className,
        },
        { new: true }
      );

      return res.status(201).json({
        message: "student created",
        data: getStudent,
      });
    } else {
      return res.status(404).json({ message: "School can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const loginStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const student = await studentModel.findOne({ email });

    if (student) {
      if (student.verified) {
        const passCheck = await bcrypt.compare(password, student.password);
        // req!.session!.sessionID = student._id;
        if (passCheck) {
          const { password, ...info } = student._doc;
          const token = jwt.sign({ id: student._id }, proc.SECRET);
          return res.status(200).json({
            message: "student found",
            data: {
              ...info,
              token,
              // session: req.session, id: req!.session!.id
            },
          });
        } else {
          return res.status(404).json({ message: "password is not correct" });
        }
      } else {
        return res
          .status(404)
          .json({ message: "You have not yet been verified" });
      }
    } else {
      return res.status(404).json({ message: "teacher cannot be found" });
    }
  } catch (err) {
    return res.status(404).json({
      message: `Error: ${err}`,
    });
  }
};
