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

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { email, name, schoolName, password } = req.body;
    const getSchool = await schoolModel.findOne({ name: schoolName });

    if (getSchool) {
      const pass = `${name.split(" ")[0] + name.split(" ")[1]}`;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pass, salt);

      const token = jwt.sign({ hash }, "ThisisStart");

      const student = await studentModel.create({
        email: `${name.split(" ")[0] + name.split(" ")[1]}@${
          schoolName.split(" ")[0]
        }.com`,
        name,
        schoolName: getSchool.schoolName,
        password: hash,
        token: "",
        verified: true,
      });

      getSchool!.students!.push(new mongoose.Types.ObjectId(student._id));
      getSchool?.save();

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
