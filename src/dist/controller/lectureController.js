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
exports.viewTeacherAllLecture = exports.viewTeacherLecture = exports.viewTopLecture = exports.viewLecture = exports.createLecture = void 0;
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const lectureModel_1 = __importDefault(require("../model/lectureModel"));
const crypto_1 = __importDefault(require("crypto"));
const moment_1 = __importDefault(require("moment"));
const subjectModel_1 = __importDefault(require("../model/subjectModel"));
const createLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = crypto_1.default.randomBytes(3).toString("hex");
        const { lectureTopic, lectureDetails, lectureNote, lectureTime, subjectCode, } = req.body;
        const getTeacher = yield teacherModel_1.default.findById(req.params.id);
        const getSubject = yield subjectModel_1.default.findOne({
            subjectToken: subjectCode,
        });
        const dater = Date.now();
        if (getTeacher && getSubject) {
            const lectureData = yield lectureModel_1.default.create({
                lectureNote,
                lectureTime,
                lectureCode: code,
                lectureDetails,
                lectureTopic,
                time: `${(0, moment_1.default)(dater).format("dddd")}, ${(0, moment_1.default)(dater).format("MMMM Do YYYY, h:mm:ss")}`,
                teacherName: getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.name,
                className: getSubject === null || getSubject === void 0 ? void 0 : getSubject.className,
                subjectName: getSubject === null || getSubject === void 0 ? void 0 : getSubject.subjectName,
                lecturePerformance: 0,
            });
            getSubject.lecture.push(new mongoose_1.default.Types.ObjectId(lectureData._id));
            getSubject === null || getSubject === void 0 ? void 0 : getSubject.save();
            getTeacher.lecture.push(new mongoose_1.default.Types.ObjectId(lectureData === null || lectureData === void 0 ? void 0 : lectureData._id));
            getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.save();
            return res.status(201).json({
                message: "lecture created",
                data: lectureData,
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
exports.createLecture = createLecture;
const viewLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield subjectModel_1.default.findById(req.params.id).populate({
            path: "lecture",
            options: {
                sort: { createdAt: -1 },
            },
        });
        console.log(test);
        return res.status(200).json({
            message: "viewing lecture",
            data: test,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewLecture = viewLecture;
const viewTopLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield subjectModel_1.default.findById(req.params.id).populate({
            path: "lecture",
            options: {
                sort: { createdAt: -1 },
                limit: 1,
            },
        });
        return res.status(200).json({
            message: "viewing test",
            data: test,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTopLecture = viewTopLecture;
const viewTeacherLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lecture = yield teacherModel_1.default.findById(req.params.id).populate({
            path: "lecture",
            options: {
                sort: { createdAt: -1 },
                limit: 1,
            },
        });
        return res.status(200).json({
            message: "viewing lecture",
            data: lecture,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTeacherLecture = viewTeacherLecture;
const viewTeacherAllLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lecture = yield teacherModel_1.default.findById(req.params.id).populate({
            path: "lecture",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(200).json({
            message: "viewing lecture",
            data: lecture,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTeacherAllLecture = viewTeacherAllLecture;
