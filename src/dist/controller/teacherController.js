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
exports.assignStudentToClass = exports.getSchoolTeacherInfo = exports.updateTeacherImage = exports.loginTeacher = exports.changePassword = exports.resetPassword = exports.verifiedTeacher = exports.createTeacher = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../utils/email");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const classModel_1 = __importDefault(require("../model/classModel"));
const dotenv_1 = require("dotenv");
const moment_1 = __importDefault(require("moment"));
(0, dotenv_1.config)();
const proc = (0, dotenv_1.config)().parsed;
const createTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, schoolName, password } = req.body;
        const getSchool = yield schoolModel_1.default.findOne({ name: schoolName });
        if (getSchool === null || getSchool === void 0 ? void 0 : getSchool.verified) {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(password, salt);
            const token = jsonwebtoken_1.default.sign({ hash }, "ThisisStart");
            const dater = Date.now();
            const teacher = yield teacherModel_1.default.create({
                email,
                name,
                resumedDate: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY, h:mm:ss")}`,
                schoolName,
                password: hash,
                token,
                status: "Teacher",
            });
            getSchool.teachers.push(new mongoose_1.default.Types.ObjectId(teacher._id));
            getSchool === null || getSchool === void 0 ? void 0 : getSchool.save();
            (0, email_1.verifiedTeacherMail)(teacher);
            return res.status(201).json({
                message: "Teacher created",
                data: teacher,
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
exports.createTeacher = createTeacher;
const verifiedTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield teacherModel_1.default.findById(req.params.id);
        const code = crypto_1.default.randomBytes(2).toString("hex");
        if ((teacher === null || teacher === void 0 ? void 0 : teacher.token) !== "") {
            yield teacherModel_1.default.findByIdAndUpdate(teacher === null || teacher === void 0 ? void 0 : teacher._id, {
                verified: true,
                token: "",
                teacherCode: code,
            }, { new: true });
            return res.status(200).json({
                message: `Your account has been verified, you can now sign in`,
            });
        }
        else {
            return res.status(200).json({ message: `Check your account` });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.verifiedTeacher = verifiedTeacher;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const teacher = yield teacherModel_1.default.findOne({ email });
        if (teacher) {
            if ((teacher === null || teacher === void 0 ? void 0 : teacher.verified) && (teacher === null || teacher === void 0 ? void 0 : teacher.token) === "") {
                const token = crypto_1.default.randomBytes(5).toString("hex");
                const myToken = jsonwebtoken_1.default.sign({ token }, "thisIsHome");
                yield teacherModel_1.default.findByIdAndUpdate(teacher._id, { token: myToken }, { new: true });
                (0, email_1.resetMyPasswordTeacherMail)(teacher, myToken)
                    .then((result) => {
                    console.log("message been sent to you: ");
                })
                    .catch((error) => console.log(error));
                return res.status(200).json({
                    message: "Please check your email to continue",
                });
            }
            else {
                return res
                    .status(404)
                    .json({ message: "You do not have enough right to do this!" });
            }
        }
        else {
            return res.status(404).json({ message: "user can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `An Error Occur: ${error} ` });
    }
});
exports.resetPassword = resetPassword;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const teacher = yield teacherModel_1.default.findById(req.params.id);
        if (teacher) {
            if (teacher.verified && teacher.token === req.params.token) {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashed = yield bcrypt_1.default.hash(password, salt);
                yield teacherModel_1.default.findByIdAndUpdate(teacher._id, {
                    token: "",
                    password: hashed,
                }, { new: true });
            }
        }
        else {
            return res.status(404).json({ message: "operation can't be done" });
        }
        return res.status(200).json({
            message: "password has been changed",
        });
    }
    catch (error) {
        return res.status(404).json({ message: "An Error Occur" });
    }
});
exports.changePassword = changePassword;
const loginTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const teacher = yield teacherModel_1.default.findOne({ email });
        if (teacher) {
            if (teacher.verified) {
                const passCheck = yield bcrypt_1.default.compare(password, teacher.password);
                // req!.session!.sessionID = teacher._id;
                if (passCheck) {
                    const _a = teacher._doc, { password } = _a, info = __rest(_a, ["password"]);
                    const token = jsonwebtoken_1.default.sign({ id: teacher._id }, proc.SECRET);
                    return res.status(200).json({
                        message: "teacher found",
                        data: Object.assign({}, info),
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
exports.loginTeacher = loginTeacher;
const updateTeacherImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const image = yield cloudinary_1.default.uploader.upload(req === null || req === void 0 ? void 0 : req.file.path);
        const teacher = yield teacherModel_1.default.findByIdAndUpdate(req.params.id, { image: image.secure_url }, { new: true });
        return res.status(200).json({
            message: "image uploaded",
            data: teacher,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.updateTeacherImage = updateTeacherImage;
const getSchoolTeacherInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teachers = yield schoolModel_1.default.findById(req.params.id).populate({
            path: "teachers",
            options: { sort: { createdAt: -1 } },
        });
        return res.status(200).json({
            message: "Here are your Teachers",
            data: teachers,
        });
    }
    catch (err) {
        return res.status(404).json({
            message: `Error: ${err}`,
        });
    }
});
exports.getSchoolTeacherInfo = getSchoolTeacherInfo;
const assignStudentToClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const teacher = yield teacherModel_1.default.findById(req.params.id);
        const student = yield studentModel_1.default.findOne({ name });
        if ((teacher === null || teacher === void 0 ? void 0 : teacher.schoolName) === student.schoolName) {
            const myClass = yield classModel_1.default.findOne({ className: teacher.classes });
            if (myClass.className === teacher.classes) {
                myClass.students.push(new mongoose_1.default.Types.ObjectId(student._id));
                return res.status(200).json({
                    message: "Here are your Teachers",
                    data: teacher,
                });
            }
            else {
                return res.status(200).json({
                    message: "something went wrong",
                });
            }
        }
        else {
            return res.status(200).json({
                message: "something went wrong",
            });
        }
    }
    catch (err) {
        return res.status(404).json({
            message: `Error: ${err}`,
        });
    }
});
exports.assignStudentToClass = assignStudentToClass;
