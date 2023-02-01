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
exports.viewStudentAttendance = exports.viewStudentAttendanceByTeacher = exports.createAttendanceAbsent = exports.createAttendancePresent = void 0;
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const classModel_1 = __importDefault(require("../model/classModel"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const attendanceModel_1 = __importDefault(require("../model/attendanceModel"));
const moment_1 = __importDefault(require("moment"));
const createAttendancePresent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTeacher = yield teacherModel_1.default.findById(req.params.id);
        const getStudent = yield studentModel_1.default.findById(req.params.studentID);
        const getClass = yield classModel_1.default.findOne({
            className: getStudent.className,
        });
        if (getTeacher && getStudent) {
            const code = crypto_1.default.randomBytes(2).toString("hex");
            const dater = Date.now();
            const attendance = yield attendanceModel_1.default.create({
                className: getStudent.className,
                classToken: code,
                present: true,
                absent: false,
                studentName: getStudent.name,
                classTeacher: getTeacher.name,
                dateTime: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY")}`,
                date: `${(0, moment_1.default)(dater).format("dddd")}`,
            });
            getTeacher.attendance.push(new mongoose_1.default.Types.ObjectId(attendance._id));
            getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.save();
            getClass.attendance.push(new mongoose_1.default.Types.ObjectId(attendance._id));
            getClass === null || getClass === void 0 ? void 0 : getClass.save();
            getStudent.attendance.push(new mongoose_1.default.Types.ObjectId(attendance._id));
            getStudent === null || getStudent === void 0 ? void 0 : getStudent.save();
            return res.status(201).json({
                message: "student has been marked Present for today",
                data: attendance,
            });
        }
        else {
            return res.status(404).json({ message: "student can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.createAttendancePresent = createAttendancePresent;
const createAttendanceAbsent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { className, present, absent, studentName, classTeacher } = req.body;
        const getTeacher = yield teacherModel_1.default.findById(req.params.id);
        const getStudent = yield studentModel_1.default.findById(req.params.studentID);
        const getClass = yield classModel_1.default.findOne({
            className: getStudent.className,
        });
        if (getTeacher && getStudent) {
            const code = crypto_1.default.randomBytes(2).toString("hex");
            const dater = Date.now();
            const attendance = yield attendanceModel_1.default.create({
                className: getStudent.className,
                classToken: code,
                present: false,
                absent: true,
                studentName: getStudent.name,
                classTeacher: getTeacher.name,
                dateTime: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY, h:mm:ss")}`,
                date: `${(0, moment_1.default)(dater).format("dddd")}`,
            });
            getTeacher.attendance.push(new mongoose_1.default.Types.ObjectId(attendance._id));
            getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.save();
            getStudent.attendance.push(new mongoose_1.default.Types.ObjectId(attendance._id));
            getStudent === null || getStudent === void 0 ? void 0 : getStudent.save();
            getClass.attendance.push(new mongoose_1.default.Types.ObjectId(attendance._id));
            getClass === null || getClass === void 0 ? void 0 : getClass.save();
            return res.status(201).json({
                message: "student has been marked Absent for today ",
                data: attendance,
            });
        }
        else {
            return res.status(404).json({ message: "Student can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.createAttendanceAbsent = createAttendanceAbsent;
const viewStudentAttendanceByTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendance = yield classModel_1.default.findById(req.params.id).populate({
            path: "attendance",
            options: { sort: { createdAt: -1 } },
        });
        return res.status(200).json({
            message: `Viewing attendance attendance detail...!`,
            data: attendance,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewStudentAttendanceByTeacher = viewStudentAttendanceByTeacher;
const viewStudentAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentModel_1.default.findById(req.params.id).populate({
            path: "attendance",
            options: { sort: { createdAt: -1 } },
        });
        return res.status(200).json({
            message: `Viewing student attendance detail...!`,
            data: student,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewStudentAttendance = viewStudentAttendance;
