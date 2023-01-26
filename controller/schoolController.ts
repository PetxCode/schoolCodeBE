import schoolModel from "../model/schoolModel";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import fs from "fs";
import { config } from "dotenv";
config();
import { resetMyPasswordSchoolMail, verifiedSchoolMail } from "../utils/email";

import cloudinary from "../utils/cloudinary";
import streamifier from "streamifier";

const proc: any = config().parsed;

interface iSchool {
  schoolName?: string;
  email: string;
  password: string;
  logo?: string;
  token?: string;
  verified?: boolean;
  _id?: string;
}

export const getSchools = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await schoolModel.find();
    return res.status(200).json({
      message: "found",
      data: user,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const getSchool = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await schoolModel.findById(req.params.id);
    return res.status(200).json({
      message: "school found",
      data: user,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const updateSchool = async (req: any, res: any): Promise<Response> => {
  try {
    let streamUpload = (req: any) => {
      return new Promise(async (resolve: any, reject: any) => {
        let stream: string | any = await cloudinary.uploader.upload_stream(
          (error: any, result: Buffer) => {
            if (result) {
              return resolve(result);
            } else {
              console.log("reading Error: ", error);
              return reject(error);
            }
          }
        );

        streamifier.createReadStream(req?.file!.buffer!).pipe(stream);
      });
    };

    const image: any = await streamUpload(req);

    const user = await schoolModel.findByIdAndUpdate(
      req.params.id,
      { logo: image.secure_url! },
      { new: true }
    );

    return res.status(200).json({
      message: "school found",
      data: user,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const updateSchoolInfo = async (
  req: any,
  res: any
): Promise<Response> => {
  try {
    const { address, contact, vision, mission } = req.body;

    const user = await schoolModel.findByIdAndUpdate(
      req.params.id,
      { address, contact, vision, mission },
      { new: true }
    );
    return res.status(200).json({
      message: "school info has been updated",
      data: user,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const createSchool = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { schoolName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const token = jwt.sign({ hash }, proc.SECRET);

    const school = await schoolModel.create({
      schoolName,
      email,
      password: hash,
      token,
      status: "School",
    });

    verifiedSchoolMail(school)
      .then((result) => {
        console.log("message been sent to you: ");
      })
      .catch((error) => console.log(error));

    return res.status(200).json({
      message: "school found",
      data: school,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const loginSchool = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    // console.log(req.session);
    const school = await schoolModel.findOne({ email });

    if (school) {
      if (school.verified) {
        const passCheck = await bcrypt.compare(password, school.password);
        const token = jwt.sign({ id: school._id }, proc.SECRET);
        // req!.session!.sessionID = school._id;
        if (passCheck) {
          const { password, ...info } = school._doc;

          return res.status(200).json({
            message: "school found",
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
          .json({ message: "school has not yet been verified" });
      }
    } else {
      return res.status(404).json({ message: "school cannot be found" });
    }
  } catch (err) {
    return res.status(404).json({
      message: `Error: ${err}`,
    });
  }
};

export const verifiedSchool = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const school = await schoolModel.findById(req.params.id);

    if (school) {
      if (!school.verified && school.token !== "") {
        const code = crypto.randomBytes(2).toString("hex");
        const school = await schoolModel.findByIdAndUpdate(
          req.params.id,
          {
            verified: true,
            token: "",
            schoolCode: code,
          },
          { new: true }
        );

        return res.status(200).json({
          message: "You have been verified, you can now Sign in",
          data: school,
        });
      } else {
        return res
          .status(404)
          .json({ message: "school has not yet been verified" });
      }
    } else {
      return res.status(404).json({ message: "school cannot be found" });
    }
  } catch (err) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.body;
    // console.log("Got it");
    const school = await schoolModel.findOne({ email });
    if (school) {
      if (school?.verified && school?.token === "") {
        const token = crypto.randomBytes(5).toString("hex");
        const myToken = jwt.sign({ token }, "thisIsHome");

        await schoolModel.findByIdAndUpdate(
          school._id,
          { token: myToken },
          { new: true }
        );

        resetMyPasswordSchoolMail(school, myToken)
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
    const school = await schoolModel.findById(req.params.id);
    if (school) {
      if (school.verified && school.token === req.params.token) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        await schoolModel.findByIdAndUpdate(
          school._id,
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

export const getSchoolTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const teachers = await schoolModel
      .findById(req.params.id)
      .populate({ path: "teachers", options: { sort: { createdAt: -1 } } });

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

export const getSchoolStudents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const students = await schoolModel
      .findById(req.params.id)
      .populate({ path: "students", options: { sort: { createdAt: -1 } } });

    return res.status(200).json({
      message: "Here are your students",
      data: students,
    });
  } catch (err) {
    return res.status(404).json({
      message: `Error: ${err}`,
    });
  }
};
