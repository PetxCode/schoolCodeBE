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
exports.updateStatusReport = exports.viewStudentReport = exports.viewTeacherReport = exports.viewSchoolReport = exports.updateReportForStudent = exports.createReportForStudent = exports.createReportForTeacher = void 0;
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const reportModel_1 = __importDefault(require("../model/reportModel"));
const createReportForTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, status, senderName } = req.body;
        const getTeacher = yield teacherModel_1.default.findById(req.params.id);
        const getSchool = yield schoolModel_1.default.findOne({
            schoolName: getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.schoolName,
        });
        if (getSchool) {
            const note = yield reportModel_1.default.create({
                message,
                who: "Student",
                status: "not seen",
                senderName: getTeacher.name,
                teacher: new mongoose_1.default.Types.ObjectId(getTeacher._id),
            });
            getSchool.report.push(new mongoose_1.default.Types.ObjectId(note._id));
            getSchool === null || getSchool === void 0 ? void 0 : getSchool.save();
            getTeacher.report.push(new mongoose_1.default.Types.ObjectId(note._id));
            getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.save();
            return res.status(201).json({
                message: "report created",
                data: note,
            });
        }
        else {
            return res.status(404).json({ message: "school can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.createReportForTeacher = createReportForTeacher;
const createReportForStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const getTeacher = yield studentModel_1.default.findById(req.params.id);
        const getSchool = yield schoolModel_1.default.findOne({
            schoolName: getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.schoolName,
        });
        if (getSchool) {
            const note = yield reportModel_1.default.create({
                message,
                who: "Teacher",
                status: "not seen",
                senderName: getTeacher.name,
                student: new mongoose_1.default.Types.ObjectId(getTeacher._id),
            });
            getSchool.report.push(new mongoose_1.default.Types.ObjectId(note._id));
            getSchool === null || getSchool === void 0 ? void 0 : getSchool.save();
            getTeacher.report.push(new mongoose_1.default.Types.ObjectId(note._id));
            getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.save();
            return res.status(201).json({
                message: "report created",
                data: note,
            });
        }
        else {
            return res.status(404).json({ message: "school can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.createReportForStudent = createReportForStudent;
const updateReportForStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTeacher = yield studentModel_1.default.findById(req.params.id);
        const getSchool = yield schoolModel_1.default.findOne({
            schoolName: getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.schoolName,
        });
        if (getSchool) {
            const note = yield reportModel_1.default.findByIdAndUpdate(req.params.id, {
                status: "not seen",
            }, { new: true });
            return res.status(201).json({
                message: "report updated",
                data: note,
            });
        }
        else {
            return res.status(404).json({ message: "school can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.updateReportForStudent = updateReportForStudent;
const viewSchoolReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notify = yield schoolModel_1.default.findById(req.params.id).populate({
            path: "report",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(200).json({
            message: "Here are data for this session...!",
            data: notify,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewSchoolReport = viewSchoolReport;
const viewTeacherReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notify = yield teacherModel_1.default.findById(req.params.id).populate({
            path: "report",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(200).json({
            message: "Here are data for this session...!",
            data: notify,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTeacherReport = viewTeacherReport;
const viewStudentReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notify = yield studentModel_1.default.findById(req.params.id).populate({
            path: "report",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(200).json({
            message: "Here are data for this session...!",
            data: notify,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewStudentReport = viewStudentReport;
const updateStatusReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const notify = yield reportModel_1.default.findByIdAndUpdate(req.params.id, {
            status,
        }, { new: true });
        return res.status(200).json({
            message: "Here are data for this session...!",
            data: notify,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.updateStatusReport = updateStatusReport;
