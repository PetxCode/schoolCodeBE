import schoolModel from "../model/schoolModel";
import teacherModel from "../model/teacherModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import crypto from "crypto";
import classModel from "../model/classModel";
import subjectModel from "../model/subjectModel";

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { subjectName, subjectTeacher, classToken } = req.body;

    const getSchool = await schoolModel.findById(req.params.id);

    const getTeacher = await teacherModel.findOne({
      name: subjectTeacher,
    });
    const getClass = await classModel.findOne({ classToken });

    if (getSchool && getClass) {
      if (getTeacher?.schoolName === getSchool?.schoolName) {
        const code = crypto.randomBytes(2).toString("hex");

        const subject = await subjectModel.create({
          className: getClass.className,
          subjectName,
          subjectToken: code,
          subjectTeacher: getTeacher!.name,
        });

        getClass!.subject!.push(new mongoose.Types.ObjectId(subject._id));
        getClass?.save();

        getTeacher!.subjectTaken!.push(subjectName);
        getTeacher?.save();

        return res.status(201).json({
          message: "subject created",
          data: subject,
        });
      } else {
        return res.status(200).json({ message: "something isn't correct" });
      }
    } else {
      return res.status(404).json({ message: "School can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const createSubjectTeacherToSingle = async (
  req: Request,
  res: Response
) => {
  try {
    const { subjectName, subjectToken, subjectTeacher, classToken } = req.body;

    const getSchool = await schoolModel.findById(req.params.id);

    const getTeacher = await teacherModel.findOne({
      name: subjectTeacher,
    });

    const getSubject = await subjectModel.findOne({ subjectToken });

    if (getSchool && getSubject) {
      if (getTeacher?.schoolName === getSchool?.schoolName) {
        console.log(getTeacher?.schoolName === getSchool?.schoolName);
        const code = crypto.randomBytes(2).toString("hex");

        const subject = await subjectModel.findByIdAndUpdate(
          getSubject!._id,
          {
            subjectTeacher: getTeacher!.name,
          },
          { new: true }
        );
        console.log(getSubject);
        // getClass!.subject!.push(new mongoose.Types.ObjectId(subject._id));
        // getClass?.save();

        getTeacher!.subjectTaken!.push(subject!.subjectName!);
        getTeacher!.mySubjects!.push(new mongoose.Types.ObjectId(subject!._id));
        getTeacher?.save();

        return res.status(201).json({
          message: "subject assing to teacher",
          data: subject,
        });
      } else {
        return res.status(200).json({ message: "something isn't correct" });
      }
    } else {
      return res.status(404).json({ message: "School can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const createSingleSubject = async (req: Request, res: Response) => {
  try {
    const { subjectName, subjectTeacher, classToken } = req.body;

    const getSchool = await schoolModel.findById(req.params.id);

    const getClass = await classModel.findOne({ classToken });

    if (getSchool && getClass) {
      if (getClass?.schoolName === getSchool?.schoolName) {
        const code = crypto.randomBytes(2).toString("hex");

        const subject = await subjectModel.create({
          className: getClass.className,
          subjectName,
          subjectToken: code,
        });

        getClass!.subject!.push(new mongoose.Types.ObjectId(subject._id));
        getClass?.save();

        return res.status(201).json({
          message: "subject created",
          data: subject,
        });
      } else {
        return res.status(200).json({ message: "something isn't correct" });
      }
    } else {
      return res.status(404).json({ message: "School can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const reAssignSubjectTeacher = async (req: Request, res: Response) => {
  try {
    const { subjectName, subjectTeacher } = req.body;

    // const classes = await classModel.findById(req.params.subjectID);

    const school = await schoolModel.findById(req.params.id);
    const subject = await subjectModel.findById(req.params.subjectID);
    const teacher = await teacherModel.findOne({ name: subjectTeacher });

    if (teacher?.schoolName === school?.schoolName) {
      console.log(teacher?.schoolName === school?.schoolName);
      await subjectModel.findByIdAndUpdate(
        req.params.subjectID,
        {
          subjectTeacher: teacher?.name,
        },
        { new: true }
      );
      await teacherModel.findByIdAndUpdate(
        teacher!._id,
        {
          subjectTaken: subject!.subjectName,
        },
        { new: true }
      );

      teacher!.subjectTaken!.push(subjectName);
      teacher?.save();

      return res.status(200).json({
        message: `Teacher has been reassigned to this subject: ${subject?.subjectName}...!`,
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

export const assignSubjectToTeacher = async (req: Request, res: Response) => {
  try {
    const { subjectName, classToken } = req.body;
    // const classes = await classModel.findById(req.params.subjectID);

    const school = await schoolModel.findById(req.params.id);
    const teacher = await teacherModel.findById(req.params.teacherID);
    const findSubject = await subjectModel.findOne({ subjectName });

    const code = crypto.randomBytes(2).toString("hex");

    const getClass = await classModel.findOne({ classToken });

    if (teacher?.schoolName === school?.schoolName && getClass) {
      const subject = await subjectModel.create({
        className: getClass.className,
        subjectName,
        subjectToken: code,
        subjectTeacher: teacher!.name,
      });

      await teacherModel.findByIdAndUpdate(
        teacher!._id,
        {
          subjectTaken: subject!.subjectName,
        },
        { new: true }
      );

      getClass!.subject!.push(new mongoose.Types.ObjectId(subject._id));
      getClass?.save();

      teacher!.subjectTaken!.push(subjectName);
      teacher?.save();

      teacher!.mySubjects!.push(new mongoose.Types.ObjectId(subject._id));
      teacher?.save();

      return res.status(200).json({
        message: `Teacher has been assigned to this subject: ${subject?.subjectName}...!`,
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

export const viewClassSubjects = async (req: Request, res: Response) => {
  try {
    const school = await schoolModel.findById(req.params.id);
    const getClass = await classModel.findById(req.params.id);

    const myClass = await classModel.findById(req.params.id).populate({
      path: "subject",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(200).json({
      message: `Viewing class subjects...!`,
      data: myClass,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTeacherSubjects = async (req: Request, res: Response) => {
  try {
    const myClass = await teacherModel.findById(req.params.id).populate({
      path: "mySubjects",
      options: {
        sort: { createdAt: -1 },
      },
    });
    console.log(myClass);
    return res.status(200).json({
      message: `Viewing teacher subjects...!`,
      data: myClass!.mySubjects,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

// export const viewClassStudents = async (req: Request, res: Response) => {
//   try {
//     const classStudents = await classModel.findById(req.params.id);

//     const code = crypto.randomBytes(2).toString("hex");

//     if (classStudents) {
//       const myClass = await classModel.findById(classStudents._id).populate({
//         path: "students",
//         options: {
//           sort: { createdAt: -1 },
//         },
//       });

//       return res.status(200).json({
//         message: `Viewing class detail...!`,
//         data: myClass,
//       });
//     } else {
//       return res.status(404).json({ message: `Please fixed the school Name` });
//     }
//   } catch (error) {
//     return res.status(404).json({ message: `Error: ${error}` });
//   }
// };

// export const viewClassDetailInfo = async (req: Request, res: Response) => {
//   try {
//     const myClass = await classModel.findById(req.params.id);

//     const code = crypto.randomBytes(2).toString("hex");
//     return res.status(200).json({
//       message: `Viewing class detail...!`,
//       data: myClass,
//     });
//   } catch (error) {
//     return res.status(404).json({ message: `Error: ${error}` });
//   }
// };

// export const viewClassSchoolFeeInfo = async (req: Request, res: Response) => {
//   try {
//     const myClass = await classModel.findById(req.params.id).populate({
//       path: "schoolFee",
//       options: {
//         sort: { createdAt: -1 },
//       },
//     });

//     const code = crypto.randomBytes(2).toString("hex");
//     return res.status(200).json({
//       message: `Viewing class school fee detail...!`,
//       data: myClass,
//     });
//   } catch (error) {
//     return res.status(404).json({ message: `Error: ${error}` });
//   }
// };

// export const viewClasses = async (req: Request, res: Response) => {
//   try {
//     const myClass = await classModel.find();

//     return res.status(200).json({
//       message: `Viewing class detail...!`,
//       data: myClass,
//     });
//   } catch (error) {
//     return res.status(404).json({ message: `Error: ${error}` });
//   }
// };
