import schoolModel from "../model/schoolModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import crypto from "crypto";
import classModel from "../model/classModel";
import studentModel from "../model/studentModel";
import moment from "moment";
import academicSessionModel from "../model/academicSessionModel";
import schoolFeeModel from "../model/schoolFeeModel";

export const createPaySchoolFeeByAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const { amountPaid, sessionCode } = req.body;

    const getSchool = await schoolModel.findById(req.params.id);

    const getStudent = await studentModel.findById(req.params.studentID);
    const getSession = await academicSessionModel.findOne({
      sessionCode,
    });

    const classFee = await classModel.findOne({
      className: getStudent?.className,
    });

    if (getSchool) {
      const dater = Date.now();
      const paymentData = await schoolFeeModel.create({
        dateTime: `${moment(dater).format("dddd")}, ${moment(dater).format(
          "MMMM Do YYYY, h:mm:ss"
        )}`,
        receiptToken: dater,
        date: `${moment(dater).format("dddd")}`,
        studentName: getStudent!.name,
        studentClass: getStudent!.className,
        academicTerm: getSession?.academicTerm,
        amountPaid,
        toBalance: classFee?.termFee! - amountPaid,
        academicSession: getSession?.academicSession,
      });

      getSession!.schoolFees!.push(
        new mongoose.Types.ObjectId(paymentData._id)
      );
      getSession?.save();

      getStudent!.schoolFee!.push(new mongoose.Types.ObjectId(paymentData._id));
      getStudent?.save();

      classFee!.schoolFee!.push(new mongoose.Types.ObjectId(paymentData._id));
      classFee?.save();

      return res.status(201).json({
        message: "payment of school fee recorded",
        data: paymentData,
      });
    } else {
      return res.status(404).json({ message: "student can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const updatePaySchoolFeeByAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const { amountPaid, sessionCode } = req.body;

    const getSchool = await schoolModel.findById(req.params.id);

    const getStudent = await studentModel.findById(req.params.studentID);
    const getPayment = await schoolFeeModel.findById(req.params.paymentID);

    const getSession = await academicSessionModel.findOne({
      sessionCode,
    });

    const classFee = await classModel.findOne({
      className: getStudent?.className,
    });
    console.log(getPayment);
    if (getSchool) {
      const dater = Date.now();

      await schoolFeeModel.findByIdAndUpdate(getPayment!._id, {
        amountPaid: getPayment!.amountPaid! + amountPaid,
      });

      const paymentData = await schoolFeeModel.findByIdAndUpdate(
        getPayment!._id,
        {
          dateTime: `${moment(dater).format("dddd")}, ${moment(dater).format(
            "MMMM Do YYYY, h:mm:ss"
          )}`,
          receiptToken: dater,
          date: `${moment(dater).format("dddd")}`,
          toBalance: classFee?.termFee! - getPayment!.amountPaid!,
        }
      );

      getSession!.schoolFees!.push(
        new mongoose.Types.ObjectId(paymentData!._id)
      );
      getSession?.save();

      getStudent!.schoolFee!.push(
        new mongoose.Types.ObjectId(paymentData!._id)
      );
      getStudent?.save();

      return res.status(201).json({
        message: "payment of school fee recorded",
        data: paymentData,
      });
    } else {
      return res.status(404).json({ message: "student can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const createPaySchoolFeeByParant = async (
  req: Request,
  res: Response
) => {
  try {
    const getStudent = await studentModel.findById(req.params.id);
    const getSchool = await schoolModel.findOne({
      schoolName: getStudent?.schoolName,
    });
    const getSession = await academicSessionModel.findOne({
      schoolName: getSchool?.schoolName,
    });
    const { academicTerm, amountPaid, toBalance, academicSession } = req.body;

    if (getStudent) {
      const dater = Date.now();

      const paymentData = await academicSessionModel.create({
        dateTime: `${moment(dater).format("dddd")}, ${moment(dater).format(
          "MMMM Do YYYY, h:mm:ss"
        )}`,
        date: `${moment(dater).format("dddd")}`,
        studentName: getStudent!.name,
        studentClass: getStudent!.className,
        academicTerm,
        amountPaid,
        toBalance,
        academicSession,
      });

      getSession!.schoolFees!.push(
        new mongoose.Types.ObjectId(paymentData._id)
      );
      getSchool?.save();

      return res.status(201).json({
        message: "payment of school fee recorded",
        data: paymentData,
      });
    } else {
      return res.status(404).json({ message: "student can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewAcademicSessionPaySchoolFee = async (
  req: Request,
  res: Response
) => {
  try {
    const school = await schoolModel.findById(req.params.id);
    if (school) {
      const payment = await academicSessionModel
        .findById(req.params.sessionID)
        .populate({
          path: "schoolFees",
          options: {
            sort: {
              createdAt: -1,
            },
          },
        });

      return res.status(200).json({
        message: `Viewing academic session payments...!`,
        data: payment,
      });
    } else {
      return res.status(200).json({
        message: `You can access this info`,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewStudentSchoolFeeDetail = async (
  req: Request,
  res: Response
) => {
  try {
    const school = await schoolModel.findById(req.params.id);
    const student = await studentModel.findById(req.params.studentID);

    if (school?.schoolName === student?.schoolName) {
      const studentDetail = await studentModel
        .findById(req.params.studentID)
        .populate({
          path: "schoolFee",
          options: {
            sort: {
              createdAt: -1,
            },
          },
        });

      return res.status(200).json({
        message: `Viewing academic school fee detail...!`,
        data: studentDetail,
      });
    } else {
      return res.status(200).json({
        message: `something went wrong...!`,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewStudentSchoolFeeDetailByStudent = async (
  req: Request,
  res: Response
) => {
  try {
    // const school = await schoolModel.findById(req.params.id);
    const student = await studentModel.findById(req.params.id);

    if (student) {
      const studentDetail = await studentModel
        .findById(req.params.studentID)
        .populate({
          path: "schoolFee",
          options: {
            sort: {
              createdAt: -1,
            },
          },
        });

      return res.status(200).json({
        message: `Viewing academic school fee detail by student...!`,
        data: studentDetail,
      });
    } else {
      return res.status(200).json({
        message: `something went wrong...!`,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
