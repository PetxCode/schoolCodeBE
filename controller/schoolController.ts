import schoolModel from "../model/schoolModel";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { config } from "dotenv";
config();
const proc: any = config().parsed;

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

export const updateSchool = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name } = req.body;
    const user = await schoolModel.findByIdAndUpdate(
      req.params.id,
      { name },
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

export const createSchool = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const token = jwt.sign({ hash }, proc.SECRET);

    const user = await schoolModel.create({
      name,
      email,
      password: hash,
      token,
    });
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
