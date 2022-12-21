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
exports.assigningStudentToClass = exports.createStudent = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const classModel_1 = __importDefault(require("../model/classModel"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, schoolName } = req.body;
        const getSchool = yield schoolModel_1.default.findOne({ schoolName });
        if (getSchool) {
            const pass = `${name.split(" ")[0] + name.split(" ")[1]}`;
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(pass, salt);
            const token = jsonwebtoken_1.default.sign({ hash }, "ThisisStart");
            const student = yield studentModel_1.default.create({
                email: `${name.split(" ")[0] + name.split(" ")[1]}@${schoolName.split(" ")[0]}.com`,
                name,
                schoolName: getSchool.schoolName,
                password: hash,
                token: "",
                verified: true,
            });
            getSchool.students.push(new mongoose_1.default.Types.ObjectId(student._id));
            getSchool === null || getSchool === void 0 ? void 0 : getSchool.save();
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
