"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewTeacherSubjects = exports.viewClassSubjects = exports.assignSubjectToTeacher = exports.reAssignSubjectTeacher = exports.createSingleSubject = exports.createSubjectTeacherToSingle = exports.createSubject = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const classModel_1 = __importDefault(require("../model/classModel"));
const subjectModel_1 = __importDefault(require("../model/subjectModel"));
const createSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subjectName, subjectTeacher, classToken } = req.body;
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        const getTeacher = yield teacherModel_1.default.findOne({
            name: subjectTeacher,
        });
        const getClass = yield classModel_1.default.findOne({ classToken });
        if (getSchool && getClass) {
            if ((getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.schoolName) === (getSchool === null || getSchool === void 0 ? void 0 : getSchool.schoolName)) {
                const code = crypto_1.default.randomBytes(2).toString("hex");
                const subject = yield subjectModel_1.default.create({
                    className: getClass.className,
                    subjectName,
                    subjectToken: code,
                    subjectTeacher: getTeacher.name,
                });
                getClass.subject.push(new mongoose_1.default.Types.ObjectId(subject._id));
                getClass === null || getClass === void 0 ? void 0 : getClass.save();
                getTeacher.subjectTaken.push(subjectName);
                getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.save();
                return res.status(201).json({
                    message: "subject created",
                    data: subject,
                });
            }
            else {
                return res.status(200).json({ message: "something isn't correct" });
            }
        }
        else {
            return res.status(404).json({ message: "School can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.createSubject = createSubject;
const createSubjectTeacherToSingle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subjectName, subjectToken, subjectTeacher, classToken } = req.body;
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        const getTeacher = yield teacherModel_1.default.findOne({
            name: subjectTeacher,
        });
        const getSubject = yield subjectModel_1.default.findOne({ subjectToken });
        if (getSchool && getSubject) {
            if ((getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.schoolName) === (getSchool === null || getSchool === void 0 ? void 0 : getSchool.schoolName)) {
                console.log((getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.schoolName) === (getSchool === null || getSchool === void 0 ? void 0 : getSchool.schoolName));
                const code = crypto_1.default.randomBytes(2).toString("hex");
                const subject = yield subjectModel_1.default.findByIdAndUpdate(getSubject._id, {
                    subjectTeacher: getTeacher.name,
                }, { new: true });
                console.log(getSubject);
                // getClass!.subject!.push(new mongoose.Types.ObjectId(subject._id));
                // getClass?.save();
                getTeacher.subjectTaken.push(subject.subjectName);
                getTeacher.mySubjects.push(new mongoose_1.default.Types.ObjectId(subject._id));
                getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.save();
                return res.status(201).json({
                    message: "subject assing to teacher",
                    data: subject,
                });
            }
            else {
                return res.status(200).json({ message: "something isn't correct" });
            }
        }
        else {
            return res.status(404).json({ message: "School can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.createSubjectTeacherToSingle = createSubjectTeacherToSingle;
const createSingleSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subjectName, subjectTeacher, classToken } = req.body;
        const getSchool = yield schoolModel_1.default.findById(req.params.id);
        const getClass = yield classModel_1.default.findOne({ classToken });
        if (getSchool && getClass) {
            if ((getClass === null || getClass === void 0 ? void 0 : getClass.schoolName) === (getSchool === null || getSchool === void 0 ? void 0 : getSchool.schoolName)) {
                const code = crypto_1.default.randomBytes(2).toString("hex");
                const subject = yield subjectModel_1.default.create({
                    className: getClass.className,
                    subjectName,
                    subjectToken: code,
                });
                getClass.subject.push(new mongoose_1.default.Types.ObjectId(subject._id));
                getClass === null || getClass === void 0 ? void 0 : getClass.save();
                return res.status(201).json({
                    message: "subject created",
                    data: subject,
                });
            }
            else {
                return res.status(200).json({ message: "something isn't correct" });
            }
        }
        else {
            return res.status(404).json({ message: "School can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.createSingleSubject = createSingleSubject;
const reAssignSubjectTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subjectName, subjectTeacher } = req.body;
        // const classes = await classModel.findById(req.params.subjectID);
        const school = yield schoolModel_1.default.findById(req.params.id);
        const subject = yield subjectModel_1.default.findById(req.params.subjectID);
        const teacher = yield teacherModel_1.default.findOne({ name: subjectTeacher });
        if ((teacher === null || teacher === void 0 ? void 0 : teacher.schoolName) === (school === null || school === void 0 ? void 0 : school.schoolName)) {
            console.log((teacher === null || teacher === void 0 ? void 0 : teacher.schoolName) === (school === null || school === void 0 ? void 0 : school.schoolName));
            yield subjectModel_1.default.findByIdAndUpdate(req.params.subjectID, {
                subjectTeacher: teacher === null || teacher === void 0 ? void 0 : teacher.name,
            }, { new: true });
            yield teacherModel_1.default.findByIdAndUpdate(teacher._id, {
                subjectTaken: subject.subjectName,
            }, { new: true });
            teacher.subjectTaken.push(subjectName);
            teacher === null || teacher === void 0 ? void 0 : teacher.save();
            return res.status(200).json({
                message: `Teacher has been reassigned to this subject: ${subject === null || subject === void 0 ? void 0 : subject.subjectName}...!`,
            });
        }
        else {
            return res
                .status(404)
                .json({ message: `Please check if the Name is rightly spelt` });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.reAssignSubjectTeacher = reAssignSubjectTeacher;
const assignSubjectToTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subjectName, classToken } = req.body;
        console.log(subjectName);
        // const classes = await classModel.findById(req.params.subjectID);
        const school = yield schoolModel_1.default.findById(req.params.id);
        const teacher = yield teacherModel_1.default.findById(req.params.teacherID);
        const findSubject = yield subjectModel_1.default.findOne({ subjectName });
        const code = crypto_1.default.randomBytes(2).toString("hex");
        const getClass = yield classModel_1.default.findOne({ classToken });
        if ((teacher === null || teacher === void 0 ? void 0 : teacher.schoolName) === (school === null || school === void 0 ? void 0 : school.schoolName) && getClass) {
            // const subject = await subjectModel.findByIdAndUpdate(
            //   findSubject?._id,
            //   {
            //     subjectTeacher: teacher?.name,
            //   },
            //   { new: true }
            // );
            const subject = yield subjectModel_1.default.create({
                className: getClass.className,
                subjectName,
                subjectToken: code,
                subjectTeacher: teacher.name,
            });
            yield teacherModel_1.default.findByIdAndUpdate(teacher._id, {
                subjectTaken: subject.subjectName,
            }, { new: true });
            getClass.subject.push(new mongoose_1.default.Types.ObjectId(subject._id));
            getClass === null || getClass === void 0 ? void 0 : getClass.save();
            teacher.subjectTaken.push(subjectName);
            teacher === null || teacher === void 0 ? void 0 : teacher.save();
            teacher.mySubjects.push(new mongoose_1.default.Types.ObjectId(subject._id));
            teacher === null || teacher === void 0 ? void 0 : teacher.save();
            return res.status(200).json({
                message: `Teacher has been assigned to this subject: ${subject === null || subject === void 0 ? void 0 : subject.subjectName}...!`,
            });
        }
        else {
            return res
                .status(404)
                .json({ message: `Please check if the Name is rightly spelt` });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.assignSubjectToTeacher = assignSubjectToTeacher;
const viewClassSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const school = yield schoolModel_1.default.findById(req.params.id);
        const getClass = yield classModel_1.default.findById(req.params.id);
        const myClass = yield classModel_1.default.findById(req.params.id).populate({
            path: "subject",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(200).json({
            message: `Viewing class subjects...!`,
            data: myClass,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewClassSubjects = viewClassSubjects;
const viewTeacherSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const school = await schoolModel.findById(req.params.id);
        // const getClass = await classModel.findById(req.params.id);
        const myClass = yield teacherModel_1.default.findById(req.params.id).populate({
            path: "mySubjects",
            options: {
                sort: { createdAt: -1 },
            },
        });
        console.log(myClass);
        return res.status(200).json({
            message: `Viewing teacher subjects...!`,
            data: myClass.mySubjects,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTeacherSubjects = viewTeacherSubjects;
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
