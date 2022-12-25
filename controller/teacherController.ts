import schoolModel from "../model/schoolModel";
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
import studentModel from "../model/studentModel";
import classModel from "../model/classModel";

import { config } from "dotenv";
import moment from "moment";
config();
const proc: any = config().parsed;

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const { email, name, schoolName, password } = req.body;
    const getSchool = await schoolModel.findOne({ name: schoolName });

    if (getSchool?.verified) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const token = jwt.sign({ hash }, "ThisisStart");
      const dater = Date.now();
      const teacher = await teacherModel.create({
        email,
        name,
        resumedDate: `${moment(dater).format("dddd")}, ${moment(dater).format(
          "MMMM Do YYYY, h:mm:ss"
        )}`,
        schoolName,
        password: hash,
        token,
        status: "Teacher",
      });

      getSchool!.teachers!.push(new mongoose.Types.ObjectId(teacher._id));
      getSchool?.save();

      verifiedTeacherMail(teacher);

      return res.status(201).json({
        message: "Teacher created",
        data: teacher,
      });
    } else {
      return res.status(404).json({ message: "School can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const verifiedTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await teacherModel.findById(req.params.id);
    const code = crypto.randomBytes(2).toString("hex");

    if (teacher?.token !== "") {
      await teacherModel.findByIdAndUpdate(
        teacher?._id,
        {
          verified: true,
          token: "",
          teacherCode: code,
        },
        { new: true }
      );

      return res.status(200).json({
        message: `Your account has been verified, you can now sign in`,
      });
    } else {
      return res.status(200).json({ message: `Check your account` });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.body;

    const teacher = await teacherModel.findOne({ email });
    if (teacher) {
      if (teacher?.verified && teacher?.token === "") {
        const token = crypto.randomBytes(5).toString("hex");
        const myToken = jwt.sign({ token }, "thisIsHome");

        await teacherModel.findByIdAndUpdate(
          teacher._id,
          { token: myToken },
          { new: true }
        );

        resetMyPasswordTeacherMail(teacher, myToken)
          .then((result) => {
            console.log("message been sent to you: ");
          })
          .catch((error) => console.log(error));

        return res.status(200).json({
          message: "Please check your email to continue",
        });
      } else {
        return res
          .status(404)
          .json({ message: "You do not have enough right to do this!" });
      }
    } else {
      return res.status(404).json({ message: "user can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `An Error Occur: ${error} ` });
  }
};

export const changePassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { password } = req.body;
    const teacher = await teacherModel.findById(req.params.id);
    if (teacher) {
      if (teacher.verified && teacher.token === req.params.token) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        await teacherModel.findByIdAndUpdate(
          teacher._id,
          {
            token: "",
            password: hashed,
          },
          { new: true }
        );
      }
    } else {
      return res.status(404).json({ message: "operation can't be done" });
    }

    return res.status(200).json({
      message: "password has been changed",
    });
  } catch (error) {
    return res.status(404).json({ message: "An Error Occur" });
  }
};

export const loginTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const teacher = await teacherModel.findOne({ email });

    if (teacher) {
      if (teacher.verified) {
        const passCheck = await bcrypt.compare(password, teacher.password);
        // req!.session!.sessionID = teacher._id;
        if (passCheck) {
          const { password, ...info } = teacher._doc;
          const token = jwt.sign({ id: teacher._id }, proc.SECRET);
          return res.status(200).json({
            message: "teacher found",
            data: {
              ...info,
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

export const updateTeacherImage = async (
  req: any,
  res: any
): Promise<Response> => {
  try {
    // let streamUpload = (req) => {
    //   return new Promise(async (resolve, reject) => {
    //     let stream = await cloudinary.uploader.upload_stream(
    //       (error, result) => {
    //         if (result) {
    //           return resolve(result);
    //         } else {
    //           return reject(error);
    //         }
    //       }
    //     );

    //     streamifier.createReadStream(req?.file!.buffer).pipe(stream);
    //   });
    // };
    // const image: any = await streamUpload(req);

    const image: { secure_url: string } = await cloudinary.uploader.upload(
      req?.file!.path
    );

    const teacher = await teacherModel.findByIdAndUpdate(
      req.params.id,
      { image: image.secure_url! },
      { new: true }
    );
    return res.status(200).json({
      message: "image uploaded",
      data: teacher,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const getSchoolTeacherInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const teachers = await schoolModel.findById(req.params.id).populate({
      path: "teachers",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: "Here are your Teachers",
      data: teachers,
    });
  } catch (err) {
    return res.status(404).json({
      message: `Error: ${err}`,
    });
  }
};

export const assignStudentToClass = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name } = req.body;

    const teacher = await teacherModel.findById(req.params.id);
    const student = await studentModel.findOne({ name });

    if (teacher!?.schoolName === student!.schoolName) {
      const myClass = await classModel.findOne({ className: teacher!.classes });
      if (myClass!.className === teacher!.classes) {
        myClass!.students!.push(new mongoose.Types.ObjectId(student!._id));
        return res.status(200).json({
          message: "Here are your Teachers",
          data: teacher,
        });
      } else {
        return res.status(200).json({
          message: "something went wrong",
        });
      }
    } else {
      return res.status(200).json({
        message: "something went wrong",
      });
    }
  } catch (err) {
    return res.status(404).json({
      message: `Error: ${err}`,
    });
  }
};
