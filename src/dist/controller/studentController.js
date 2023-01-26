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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentInfo = exports.updateStudent = exports.viewStudentDetailSchool = exports.viewStudentDetail = exports.viewStudent = exports.loginStudent = exports.assigningStudentToClass = exports.createStudent = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const classModel_1 = __importDefault(require("../model/classModel"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
const dotenv_1 = require("dotenv");
const moment_1 = __importDefault(require("moment"));
(0, dotenv_1.config)();
const proc = (0, dotenv_1.config)().parsed;
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, schoolName, className } = req.body;
        const getSchool = yield schoolModel_1.default.findOne({ schoolName });
        const classes = yield classModel_1.default.findOne({ className });
        if ((getSchool === null || getSchool === void 0 ? void 0 : getSchool.schoolName) === (classes === null || classes === void 0 ? void 0 : classes.schoolName)) {
            const pass = `${name.split(" ")[0] + name.split(" ")[1]}`;
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(pass, salt);
            const token = jsonwebtoken_1.default.sign({ hash }, "ThisisStart");
            const date = Date.now();
            const student = yield studentModel_1.default.create({
                email: `${name.split(" ")[0] + name.split(" ")[1]}@${schoolName.split(" ")[0]}.com`.toLowerCase(),
                name,
                registerDate: `${(0, moment_1.default)(date).format("dddd")}, ${(0, moment_1.default)(date).format("MMMM Do YYYY, h:mm:ss")}`,
                schoolName: getSchool.schoolName,
                password: hash,
                token: "",
                verified: true,
                status: "Student",
                className,
                classID: classes === null || classes === void 0 ? void 0 : classes._id,
            });
            getSchool.students.push(new mongoose_1.default.Types.ObjectId(student._id));
            getSchool === null || getSchool === void 0 ? void 0 : getSchool.save();
            classes.students.push(new mongoose_1.default.Types.ObjectId(student._id));
            classes === null || classes === void 0 ? void 0 : classes.save();
            return res.status(201).json({
                message: "student created",
                data: student,
            });
        }
        else {
            return res.status(404).json({ message: "School can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.createStudent = createStudent;
const assigningStudentToClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const getClass = yield classModel_1.default.findById(req.params.classID);
        const getTeacher = yield teacherModel_1.default.findById(req.params.id);
        if (getTeacher) {
            const getStudent = yield studentModel_1.default.findOne({ name });
            getClass.students.push(new mongoose_1.default.Types.ObjectId(getStudent._id));
            getClass === null || getClass === void 0 ? void 0 : getClass.save();
            yield studentModel_1.default.findByIdAndUpdate(getStudent === null || getStudent === void 0 ? void 0 : getStudent._id, {
                className: getClass.className,
            }, { new: true });
            return res.status(201).json({
                message: "student created",
                data: getStudent,
            });
        }
        else {
            return res.status(404).json({ message: "School can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.assigningStudentToClass = assigningStudentToClass;
const loginStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const student = yield studentModel_1.default.findOne({ email });
        if (student) {
            if (student.verified) {
                const passCheck = yield bcrypt_1.default.compare(password, student.password);
                // req!.session!.sessionID = student._id;
                if (passCheck) {
                    const _a = student._doc, { password } = _a, info = __rest(_a, ["password"]);
                    const token = jsonwebtoken_1.default.sign({ id: student._id }, proc.SECRET);
                    return res.status(200).json({
                        message: "student found",
                        data: Object.assign(Object.assign({}, info), { token }),
                    });
                }
                else {
                    return res.status(404).json({ message: "password is not correct" });
                }
            }
            else {
                return res
                    .status(404)
                    .json({ message: "You have not yet been verified" });
            }
        }
        else {
            return res.status(404).json({ message: "teacher cannot be found" });
        }
    }
    catch (err) {
        return res.status(404).json({
            message: `Error: ${err}`,
        });
    }
});
exports.loginStudent = loginStudent;
const viewStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const school = yield schoolModel_1.default.findById(req.params.id);
        const student = yield studentModel_1.default.findById(req.params.studentID);
        if (school && student) {
            return res.status(200).json({
                message: "Awesome Detail",
                data: student,
            });
        }
        else {
            return res.status(404).json({ message: "something went wrong" });
        }
    }
    catch (err) {
        return res.status(404).json({
            message: `Error: ${err}`,
        });
    }
});
exports.viewStudent = viewStudent;
const viewStudentDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentModel_1.default.findById(req.params.id);
        const school = yield schoolModel_1.default.findOne({
            schoolName: student.schoolName,
        });
        if (school && student) {
            return res.status(200).json({
                message: "Awesome",
                data: student,
            });
        }
        else {
            return res.status(404).json({ message: "something went wrong" });
        }
    }
    catch (err) {
        return res.status(404).json({
            message: `Error: ${err}`,
        });
    }
});
exports.viewStudentDetail = viewStudentDetail;
const viewStudentDetailSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentModel_1.default.findById(req.params.id);
        const school = yield schoolModel_1.default.findOne({
            schoolName: student.schoolName,
        });
        // console.log(school);
        if (school && student) {
            return res.status(200).json({
                message: "Awesome for school",
                data: school,
            });
        }
        else {
            return res.status(404).json({ message: "something went wrong" });
        }
    }
    catch (err) {
        return res.status(404).json({
            message: `Error: ${err}`,
        });
    }
});
exports.viewStudentDetailSchool = viewStudentDetailSchool;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                let stream = yield cloudinary_1.default.uploader.upload_stream((error, result) => {
                    if (result) {
                        return resolve(result);
                    }
                    else {
                        return reject(error);
                    }
                });
                streamifier_1.default.createReadStream(req === null || req === void 0 ? void 0 : req.file.buffer).pipe(stream);
            }));
        };
        const image = yield streamUpload(req);
        const user = yield studentModel_1.default.findByIdAndUpdate(req.params.id, { image: image.secure_url }, { new: true });
        return res.status(200).json({
            message: "school found",
            data: user,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.updateStudent = updateStudent;
const updateStudentInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address, contact } = req.body;
        const user = yield studentModel_1.default.findByIdAndUpdate(req.params.id, { address, contact }, { new: true });
        return res.status(200).json({
            message: "school info has been updated",
            data: user,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.updateStudentInfo = updateStudentInfo;
