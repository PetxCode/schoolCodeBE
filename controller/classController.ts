import schoolModel from "../model/schoolModel";
import teacherModel from "../model/teacherModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import crypto from "crypto";
import classModel from "../model/classModel";
import studentModel from "../model/studentModel";

export const createClass = async (req: Request, res: Response) => {
  try {
    const { className, termFee } = req.body;

    const getSchool = await schoolModel.findById(req.params.id);

    if (getSchool) {
      const code = crypto.randomBytes(2).toString("hex");

      const classes = await classModel.create({
        className,
        termFee,
        classToken: code,
        schoolName: getSchool.schoolName,
      });

      getSchool!.classes!.push(new mongoose.Types.ObjectId(classes._id));
      getSchool?.save();

      return res.status(201).json({
        message: "class created",
        data: classes,
      });
    } else {
      return res.status(404).json({ message: "School can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const updateClassFee = async (req: Request, res: Response) => {
  try {
    const { name, termFee } = req.body;

    const school = await schoolModel.findById(req.params.id);
    const classes = await classModel.findById(req.params.classID);

    if (classes?.schoolName === school?.schoolName) {
      await classModel.findByIdAndUpdate(
        req.params.classID,
        {
          termFee,
        },
        { new: true }
      );

      return res.status(200).json({
        message: `class fee has been updated...!`,
      });
    } else {
      return res
        .status(404)
        .json({ message: `Please check if the Name is rightly spelt` });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const assigClassTeacher = async (req: Request, res: Response) => {
  try {
    const { classToken } = req.body;

    const school = await schoolModel.findById(req.params.id);
    const classes = await classModel.findOne({ classToken });
    const teacher = await teacherModel.findById(req.params.teacherID);

    if (teacher?.schoolName === school?.schoolName) {
      const justClass = await classModel.findByIdAndUpdate(
        classes?._id,
        {
          classTeacher: teacher?.name,
        },
        { new: true }
      );

      // await teacherModel.findByIdAndUpdate(
      //   teacher!._id,
      //   {
      //     $set: { classes: classes!.push(classes?.className) },
      //   },
      //   { new: true }
      // );

      teacher!.myClass!.push(new mongoose.Types.ObjectId(classes?._id));

      teacher!.classes!.push(justClass?.className!);
      teacher?.save();

      return res.status(200).json({
        message: `Teacher has been assigned to this Class yet...!`,
        data: teacher,
      });
    } else {
      return res
        .status(404)
        .json({ message: `Please check if the Name is rightly spelt` });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const assigClassStudent = async (req: Request, res: Response) => {
  try {
    const { classToken } = req.body;

    const school = await schoolModel.findById(req.params.id);
    const classes = await classModel.findOne({ classToken });
    const student = await studentModel.findById(req.params.studentID);

    if (student?.schoolName === school?.schoolName) {
      await studentModel.findByIdAndUpdate(
        student!._id,
        {
          className: classes!.className,
          classID: classes?._id,
        },
        { new: true }
      );

      classes!.students!.push(new mongoose.Types.ObjectId(student!._id));
      classes!.save();

      return res.status(200).json({
        message: `student has been assigned to this Class...!`,
      });
    } else {
      return res
        .status(404)
        .json({ message: `Please check if the Name is rightly spelt` });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const assigClassTeacherToClass = async (req: Request, res: Response) => {
  try {
    const { teacherName } = req.body;

    const school = await schoolModel.findById(req.params.id);
    const teacher = await teacherModel.findOne({ name: teacherName });
    const classes = await classModel.findById(req.params.classID);

    if (teacher?.schoolName === school?.schoolName) {
      const justClass = await classModel.findByIdAndUpdate(
        classes?._id,
        {
          classTeacher: teacher?.name,
        },
        { new: true }
      );

      teacher!.myClass!.push(new mongoose.Types.ObjectId(classes?._id));

      teacher!.classes!.push(justClass?.className!);
      teacher?.save();

      return res.status(200).json({
        message: `Teacher has been assigned to this Class...!`,
      });
    } else {
      return res
        .status(404)
        .json({ message: `Please check if the Name is rightly spelt` });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewClassDetailFromSchool = async (
  req: Request,
  res: Response
) => {
  try {
    const school = await schoolModel.findById(req.params.id);

    const code = crypto.randomBytes(2).toString("hex");

    if (school) {
      const myClass = await schoolModel.findById(school._id).populate({
        path: "classes",
        options: {
          sort: { createdAt: -1 },
        },
      });

      return res.status(200).json({
        message: `Viewing class detail...!`,
        data: myClass,
      });
    } else {
      return res.status(404).json({ message: `Please fixed the school Name` });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewClassStudents = async (req: Request, res: Response) => {
  try {
    const classStudents = await classModel.findById(req.params.id);

    const code = crypto.randomBytes(2).toString("hex");

    if (classStudents) {
      const myClass = await classModel.findById(classStudents._id).populate({
        path: "students",
        options: {
          sort: { createdAt: -1 },
        },
      });

      return res.status(200).json({
        message: `Viewing class detail...!`,
        data: myClass,
      });
    } else {
      return res.status(404).json({ message: `Please fixed the school Name` });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewClassStudentSubject = async (req: Request, res: Response) => {
  try {
    const classStudents = await classModel.findById(req.params.id);

    if (classStudents) {
      const myClass = await classModel.findById(classStudents._id).populate({
        path: "subject",
        options: {
          sort: { createdAt: -1 },
        },
      });

      return res.status(200).json({
        message: `Viewing class subject...!`,
        data: myClass,
      });
    } else {
      return res.status(404).json({ message: `Please fixed the school Name` });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

// export const viewClassForTeacher = async (req: Request, res: Response) => {
//   try {
//     const classTeacher = await teacherModel.findById(req.params.id);

//     const myClass = await classModel.findOne({classTeacher: classTeacher.name})

//     if (classTeacher) {
//       const myClass = await classModel.findById(classTeacher._id).populate({
//         path: "subject",
//         options: {
//           sort: { createdAt: -1 },
//         },
//       });

//       return res.status(200).json({
//         message: `Viewing class subject...!`,
//         data: myClass,
//       });
//     } else {
//       return res.status(404).json({ message: `Please fixed the school Name` });
//     }
//   } catch (error) {
//     return res.status(404).json({ message: `Error: ${error}` });
//   }
// };

export const viewClassDetailInfo = async (req: Request, res: Response) => {
  try {
    const myClass = await classModel.findById(req.params.id);

    const code = crypto.randomBytes(2).toString("hex");
    return res.status(200).json({
      message: `Viewing class detail...!`,
      data: myClass,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewClassSchoolFeeInfo = async (req: Request, res: Response) => {
  try {
    const myClass = await classModel.findById(req.params.id).populate({
      path: "schoolFee",
      options: {
        sort: { createdAt: -1 },
      },
    });

    const code = crypto.randomBytes(2).toString("hex");
    return res.status(200).json({
      message: `Viewing class school fee detail...!`,
      data: myClass,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewClasses = async (req: Request, res: Response) => {
  try {
    const myClass = await classModel.find();

    return res.status(200).json({
      message: `Viewing class detail...!`,
      data: myClass,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
